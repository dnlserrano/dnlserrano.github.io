---
layout:     post
title:      "ExUnit Deep Dive"
subtitle:   "through the looking-glass"
date:       2019-05-26 11:54:00
author:     "Daniel Serrano"
header-img: "img/exunit-deep-dive/cover.jpg"
header-img-author-name: "Louis Reed"
header-img-author-url: "https://unsplash.com/@_louisreed"
---

Elixir ships with `ex_unit`, its default testing framework. I never cease to be amazed at how fast `ex_unit` is. It also ships with a lot of nice handy features I end up using daily in my job. It is part of why developing Elixir is such a nice experience with fast feedback cycles and useful, simple error reporting.

But what happens when we run `mix test`?

```
......................................

Finished in 1.9 seconds
38 tests, 0 failures

Randomized with seed 280579
```

Going into this, I had the feeling it was a bit of macro magic. I could guess `ex_unit` made use of BEAM processes in a clever way and that's what made it so fast. These were hunches, thoughts, ideas. It still wasn't concrete.

What's really happening behind the curtains?

_**Disclaimer**: The codebase analysed is Elixir **v1.8.1**._

# Genesis

It all starts with the Elixir mix task for running the tests `Mix.Tasks.Test`. And as we'll see it ties nicely to our `test/test_helper.ex`.

If we dive into the Elixir source code under [`lib/mix/lib/mix/tasks/test.ex`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex) we can find the definition of the `mix test` task. It begins by defining a [`Cover` module](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex#L2-L33) (we'll get there in a second). But it also defines a [`run/1` callback](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex#L319), like [any mix task](https://hexdocs.pm/mix/Mix.Task.html#c:run/1). It begins by [parsing the options](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex#L320) passed on to ExUnit, it does some [sanity checks and chore](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex#L322-L344), and finally decides whether or not to [setup the coverage tool](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex#L346-L352):

```elixir
@cover [output: "cover", tool: Cover]

...

def run(args)
  ...

  cover =
    if opts[:cover] do
      compile_path = Mix.Project.compile_path(project)
      cover = Keyword.merge(@cover, project[:test_coverage] || [])
      cover[:tool].start(compile_path, cover)
    end

  ...
end
```

The cover tool is set to `Cover`, the module we saw defined earlier. You can analyse the source code to find that `Cover` is nothing but a custom module defining a nice wrapper around the Erlang `:cover` tool. Among other things, it simplifies the way of reporting code coverage and provides ways of exporting coverage results to HTML and textual (or _"console"_) outputs.

```elixir
defmodule Cover do
  def start(compile_path, opts) do
    ...

      :cover.compile_beam_directory(compile_path |> to_charlist)

    ...

    fn ->
      Mix.shell().info("\nGenerating cover results ...\n")
      {:result, ok, _fail} = :cover.analyse(:coverage, :line)

      ...
        console(module_results, totals, summary_opts)
      ...

      html(module_results, opts)
  end
end
```

`Cover.start/2` instructs the BEAM to track coverage over the files on the project's compile path. It then goes on to return a function which, once run, will do the actual exporting of the results displaying the result in the console, as well as producing an HTML coverage file.

Let's get back to the `run/1` callback of the mix task.

It [does some house-cleaning and knob adjusting](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex#L354-L386) to, among other things, load our app, configure our ExUnit command line options once again and filter the allowed test files to be run.

And **only then**, actually **requires and runs** the code defined in our test files.

```elixir
alias Mix.Compilers.Test, as: CT

...

def run(args) do
  ...

  case CT.require_and_run(matched_test_files, test_paths, opts) do
    {:ok, %{excluded: excluded, failures: failures, total: total}} ->
      cover && cover.()

      ...

      cond do
        ...

        failures > 0 ->
          System.at_exit(fn _ -> exit({:shutdown, 1}) end)

    ...
  end
end
```

We get back the excluded, failures and total amount of test files that were run. If we had failures (and provided we didn't use the `--raise` or `--only` options), we fall into the `failures > 0` clause. In such case, we register a ["CLI exit"](https://hexdocs.pm/elixir/Kernel.html#exit/1-cli-exits) with exit code `1` (instead of `0` for a successful exit) as the task's [exit handler function](https://hexdocs.pm/elixir/System.html#at_exit/1). If everything is green, on the other hand, we fallback to a normal exit not having to register a special "CLI exit" for that effect.

# One Level Deep

At this point we have a bird's eye view of how this process of running our tests starts (configuring `ex_unit`, setting up the code coverage analysis tool and selecting the allowed test files to run) and a glimpse at how it ends (requiring those files, running them and analysing the results).

Now, let's go a level deep, and see exactly how `ex_unit` achieves the incredible level of parallelism it has come to be known for in actually requiring and running the tests.

As we previously saw, the starting point is `CT` (an `alias` for [`Mix.Compilers.Test`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/compilers/test.ex#L1)) which is a custom compiler specific for our testing purposes. [`CT.require_and_run/3`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/compilers/test.ex#L23) does some more chore for particular use cases and then it moves on to the really meaty part.

```elixir
def require_and_run(matched_test_files, test_paths, opts) do
  ...

  task = Task.async(ExUnit, :run, [])

  try do
    case Kernel.ParallelCompiler.require(test_files, parallel_require_callbacks) do
      {:ok, _, _} -> :ok
      {:error, _, _} -> exit({:shutdown, 1})
    end

    ExUnit.Server.modules_loaded()
    %{failures: failures} = results = Task.await(task, :infinity)

    ...

    {:ok, results}

    ...
  end
end
```

It creates an asynchronous task for running [`ExUnit.run/1`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit.ex#L332-L335) which will be awaited on after we instruct `Kernel.ParallelCompiler` to require our test files and ensure modules are loaded (via `ExUnit.Server.modules_loaded/0`).

---

#### _Note #1_

_At this point you might be wondering where this `ExUnit.Server` process (a `GenServer`) gets started. It is [`:registered`](https://hexdocs.pm/mix/Mix.Tasks.Compile.App.html) in `ex_unit`'s [`mix.exs`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/mix.exs#L14) file._

_As per the Mix documentation:_

> _`:registered` - the name of all registered processes in the application. If your application defines a local GenServer with name `MyServer`, it is recommended to add `MyServer` to this list. It is most useful in detecting conflicts between applications that register the same names._

_This is just informational and a preventive measure when dealing with other applications, though. Where it really gets spawned is in [`ExUnit.start/1`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit.ex#L182), which you will have to call as part of your `test/test_helper.exs`. That's what kicks off [`ExUnit.start/2`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit.ex#L160-L169) creating the `ExUnit.Supervisor` with `ExUnit.Server`, `ExUnit.CaptureServer` and `ExUnit.OnExitHandler` under its wing._

_Now you know why the [minimal setup for `test/test_helpers.exs`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit.ex#L50-L53) is a single-line file reading `ExUnit.start()`._ 😉

---

That's quite a bit to digest. To recap, we start a process for running `ExUnit.run/1` via an async _task_ and that will be _doing some work_ as tests are parallel-compiled. When the work is finished we *await* on that process (the _task_) to end and it will return back the structure with failures and other info (excluded, total, etc.). Parallel compilation is achieved using [`Kernel.ParallelCompiler.require/2`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/elixir/lib/kernel/parallel_compiler.ex#L106).

---

#### _Note #2_

_That's a lot of compilers. We've compiled our app from source, called `Mix.Compilers.Test` and now `Kernel.ParallelCompiler`. Before we continue, I want to take a brief moment to explain as best as I can the importance of the compilation process in `ex_unit` and a bit of the way it works._

_Compilers are important in `ex_unit` because of the `ExUnit.Case` clause you annotate your test modules with._

_During test compilation we require the tests to be run via [`CT.require_and_run/3`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/compilers/test.ex#L23). That compiles the test code in parallel as we saw (via [`Kernel.ParallelCompiler.require/2`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/compilers/test.ex#L39)). When you do `use ExUnit.Case` at the top of your Elixir tests, you're adding some specific behaviour whereby each time you use `test` you really end up telling the compiler to unfold [a macro](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/case.ex#L270-L293) that [registers a test](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/case.ex#L290)._

```elixir
def register_test(%{module: mod, file: file, line: line}, test_type, name, tags) do
  ...

  tags =
    (tags ++ tag ++ describetag ++ moduletag)
    |> normalize_tags
    |> validate_tags
    |> Map.merge(%{
      line: line,
      file: file,
      registered: registered,
      async: async,
      describe: describe,
      describe_line: describe_line,
      test_type: test_type
    })

  test = %ExUnit.Test{name: name, case: mod, tags: tags, module: mod}
  Module.put_attribute(mod, :ex_unit_tests, test)

  ...
end
```

_[Registering a test](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/case.ex#L447) encompasses gathering all the needed info about the said test and fitting it nicely into a structure representing that test (via [`ExUnit.Test`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit.ex#L86-L112)). Then we [add that test](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/case.ex#L489-L490) to the [accumulating](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/case.ex#L237) module attribute `@ex_unit_tests`._

_`Kernel.ParallelCompiler.require/2` will be responsible for requiring all of the test files in parallel, registering each test._

---

Back to [`CT.require_and_run/3`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/compilers/test.ex#L23). Long story short, [`ExUnit.Runner.run/2`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/runner.ex#L8-L32) [gets called](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit.ex#L334) with `ex_unit`'s current configuration options (via the [_async_ Task](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/compilers/test.ex#L36) we mentioned) and the purpose for that is to have the runner ready to handle parallel compilation, as we discussed.

```elixir
alias ExUnit.EventManager, as: EM

def run(opts, load_us) when (is_integer(load_us) or is_nil(load_us)) and is_list(opts) do
  ...

  {:ok, manager} = EM.start_link()
  {:ok, stats_pid} = EM.add_handler(manager, ExUnit.RunnerStats, opts)
  config = configure(opts, manager, self(), stats_pid)

  ...

      EM.suite_started(config.manager, opts)
      loop(config, :async, 0)

  ...

  EM.suite_finished(config.manager, run_us, load_us)
  stats = ExUnit.RunnerStats.stats(stats_pid)
  EM.stop(config.manager)

  ...

  stats
end

defp configure(opts, manager, runner_pid, stats_pid) do
  Enum.each(opts[:formatters], &EM.add_handler(manager, &1, opts))

  ...
end
```

Among other things, [`ExUnit.EventManager`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/event_manager.ex#L1) is started and a handler for test statistics is added ([`ExUnit.RunnerStats`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/runner_stats.ex#L1)), as well as for each formatter ([by default `ExUnit.CLIFormatter`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/mix.exs#L27)).

`ExUnit.EventManager` is an incredible piece in all of `ex_unit`'s design. It is the mechanism through which you can hook into the various callbacks the testing framework provides to know when events such as `:test_started`, `:test_finished`, `:max_failures_reached` and so on happened. It leverages [`:gen_event`](http://erlang.org/doc/man/gen_event.html) and [`DynamicSupervisor`](https://hexdocs.pm/elixir/DynamicSupervisor.html) to notify the various handlers whenever a relevant event occurs.

---

#### _Note #3_

`ExUnit.EventManager` is what powers the simplicity of, e.g., [`junit_formatter`](https://github.com/victorolinasc/junit-formatter) which we all love so much to have nice JUnit-like formatting of our tests in build systems like Jenkins. Implementing it is a breeze thanks to the simple callback functions this [formatter](https://github.com/victorolinasc/junit-formatter/blob/master/lib/formatter.ex#L68-L84) needs to handle.

---

[Continuing on `ExUnit.Runner.run/2`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/runner.ex#L18), `ExUnit.EventManager` is notified for `:suite_started` and **the _holy_ [`loop`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/runner.ex#L19) begins**.

When it reaches the end the event manager (`EM`) is notified for `:suite_finished`, tests stats are collected, event manager is stopped and _"after suite"_ callbacks get called. But what exactly is happening in that loop?

# Holy test loop

This is where everything comes together.

```elixir
defp loop(config, :async, taken) do
  available = config.max_cases - taken

  cond do
    # No modules available, wait for one
    available <= 0 ->
      wait_until_available(config, :async, taken)

    # Slots are available, start with async modules
    modules = ExUnit.Server.take_async_modules(available) ->
      spawn_modules(config, modules, :async, taken)

    true ->
      modules = ExUnit.Server.take_sync_modules()
      loop(config, modules, taken)
  end
end
```

From [`ExUnit`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit.ex#L246-L248), we get a hint at what is happening in the top line.

```
* `:max_cases` - maximum number of tests to run in parallel. Only tests from
  different modules run in parallel. It defaults to `System.schedulers_online * 2`
  to optimize both CPU-bound and IO-bound tests;
```

So here we're choosing the number of modules we should _take_ to run in parallel. If we don't have any slots available, we wait. That's not the case. Given we've taken no modules yet, we'll start by taking double the number of online schedulers the BEAM provides us (`8` in my machine). We start with async modules, as it is (again) hinted in the comments.

We get the modules to be run first by calling [`ExUnit.Server.take_async_modules/1`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/server.ex#L23-L26), which in turn runs the appropriate [`handle_call/3` callback](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/server.ex#L47-L49).

```elixir
defmodule ExUnit.Server do
  ...

  def take_async_modules(count) do
    timeout = Application.fetch_env!(:ex_unit, :module_load_timeout)
    GenServer.call(@name, {:take_async_modules, count}, timeout)
  end

  ...

  def handle_call({:take_async_modules, count}, from, %{waiting: nil} = state) do
    {:noreply, take_modules(%{state | waiting: {from, count}})}
  end

  ...

  defp take_modules(%{waiting: {from, count}, async_modules: modules} = state) do
    {reply, modules} = Enum.split(modules, count)
    GenServer.reply(from, reply)
    %{state | async_modules: modules, waiting: nil}
  end
end
```

These modules are handed over to the calling process by means of calling `GenServer.reply(from, reply)`. Notice the modules are retrieved from `ExUnit.Server`'s running state. But how did the modules get there in the first place?

This is one of those Aha! moments. Stay with me.

```elixir
def __after_compile__(%{module: module}, _) do
  if Module.get_attribute(module, :ex_unit_async) do
    ExUnit.Server.add_async_module(module)
  else
    ExUnit.Server.add_sync_module(module)
  end
end
```

Remember `ExUnit.Case`? It defines an [`__after_compile__`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/case.ex#L427-L433) [hook](https://hexdocs.pm/elixir/Module.html#module-after_compile) on each test module to conditonally add it in a sync or async fashion to the test suite (via `ExUnit.Server`).

As test modules are being compiled, they're being added to `ExUnit.Server` and then picked up by the same `ExUnit.Server` when some other resource requests it a specific amount of modules to _take_ (i.e., for which to run its tests).

The _holy loop_ continues until [we're left with sync modules only](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/runner.ex#L73-L75). You can explore the code to understand exactly at what moments (and how) messages are passed between processes to guarantee all tests are run and failures are guaranteed to be safely bubbled up to the user.

The crux of it though is understanding exactly how a test ends up running. It happens in the private function [`ExUnit.Runner.exec_test/1`](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/runner.ex#L354-L360):

```elixir
defp exec_test(%ExUnit.Test{module: module, name: name, tags: context} = test) do
  apply(module, name, [context])
  test
catch
  kind, error ->
    %{test | state: failed(kind, error, prune_stacktrace(__STACKTRACE__))}
end
```

Running the test entails [`apply`ing](https://hexdocs.pm/elixir/Kernel.html#apply/3) a function from the test module given that test context. The function that is called gets defined by the [`test` macro](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/case.ex#L291). The name of that function is given by the name you gave to that specific test (e.g., `:"removes the item from the queue"`).

Inside each of the `test`s we define, we use `assert` to confirm the behaviour we expect from our tests. As you can probably guess by now, `assert` is the [macro](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/assertions.ex#L104) (with [different](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/assertions.ex#L154) [variations](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/assertions.ex#L169)) that will cause the test to either [raise an error](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/assertions.ex#L179) or not.

If running the test fails, we catch the error and tag the test as a failure. Otherwise, nothing to see here. We move along returning the test back without changing its `state`, which as we've previously seen in `ExUnit.CLIFormatter` [means it was a success](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/ex_unit/lib/ex_unit/cli_formatter.ex#L44-L56).

All tests run. Macros and spawned processes in a perfectly orchestrated dance of messages and pattern-matching. The test suite ends. Failures are reported back to the user. Analyse, fix, rinse and repeat until green.

# Conclusions

ExUnit is a hell of a framework, and I say that in the best possible way.

Even though we went in a bit deep on this blog post, we've only touched a small part of what ExUnit does and how it achieves it. There are [plenty of optional switches available](https://github.com/elixir-lang/elixir/blob/v1.8.1/lib/mix/lib/mix/tasks/test.ex#L146-L180). Analysing each would take us through lots of different areas of the codebase and would have us learn much more!

I hope I was able to show you how ExUnit takes the most out of Elixir and the BEAM. It leverages the [_"Lispy"_ macro system from Elixir](https://8thlight.com/blog/patrick-gombert/2013/11/26/lispy-elixir.html) while also taking advantage of processes and message passing between them to achieve a highly concurrent solution for running our tests in a greatly optimized manner. On top of that, the testing framework provides callback mechanisms that allow you to hook into the _process_ (pun not intended) of running the tests, which can open a myriad of possibilities.

I have looked deeply into how ExUnit works because I have this idea for a project. I have learned about mutation testing a while back. First in a Ruby meetup here in Portugal where someone presented about [`mutant`](https://github.com/mbj/mutant). Then a colleague of mine talked again about it at a Tech Catchup (a tech event we do at the company I work at, [Onfido](https://onfido.com)). And most recently, a friend of mine [presented about it](https://www.youtube.com/watch?v=DYx-GQ1UoKM) and talked about how they're using it at the company he works at, this time using the JVM-specific [`pitest`](http://pitest.org/) framework. I have something in the works, very rough at this point in time for our beloved Elixir. More news soon... maybe?

#### Acknowledgments

[This tweet](https://twitter.com/whatyouhide/status/1122523444044759040) from Andrea Leopardi ([`@whatyouhide`](https://twitter.com/whatyouhide)) helped me try out hypothesis by quickly changing the Elixir source code for ExUnit locally (i.e., in my machine) using [`asdf`](https://asdf-vm.com/), ultimately contributing to my understanding of some details of the workflow of ExUnit.
