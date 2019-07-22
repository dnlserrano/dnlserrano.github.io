---
layout:     post
title:      "Mutation testing in Elixir"
subtitle:   "introducing exavier"
date:       2019-07-22 12:19:00
author:     "Daniel Serrano"
header-img: "img/mutation-testing-elixir/cover.jpg"
header-img-author-name: "Adrien Converse"
header-img-author-url: "https://unsplash.com/@lurm"
---

I first heard about mutation testing when attending a Ruby meetup here in Lisbon. At the time [Tadas](https://twitter.com/tadassce) presentation focused on [`mutant`](https://github.com/mbj/mutant), **the** Ruby library for mutation testing by [mbj](https://twitter.com/_m_b_j_).

It sounded fun, but not very practical. I think that was because I didn't understand the full scope, goals and philosophy, so to speak, of mutation testing. This post will help explore mutation testing and why Elixir is a good candidate to give it a shot. I will then introduce a library I've been working on [`exavier`](https://github.com/dnlserano/exavier) which aims to provide a full-blown mutation testing framework for Elixir.

It's still very early days, it may be haunted by major design flaws, stupid ideas and this blog post also serves a bit as a call for help. If you're out there reading and you think mutation testing might be your thing and you want to help, hit me up [@dnlserrano](https://twitter.com/dnlserrano) or [open a PR](https://github.com/dnlserrano/exavier).

# What is mutation testing?

Let's take a step back and discuss what exactly all of this is. Mutation testing is a software testing technique to ensure quality in your tests whereby one runs the same set of unit tests multiple times, making different small changes (mutations) to the source code under test each time. The intuition behind it is easy: if the same green tests you had continue to be green after you've applied the mutations on the original source code, then something must be off.

Consider the following example of a simple `even?/1` function that checks if a given number is even:

```elixir
defmodule HelloWorld do
  def even?(x), do: rem(x, 2) == 0
end
```

We could think of adding this simple test:

```elixir
defmodule HelloWorldTest do
  use ExUnit.Case, async: true

  @subject HelloWorld

  test "when even" do
    assert @subject.even?(2) == true
  end
end
```

With this, we're testing a basic case of an even number. Good, right?

Imagine we now _mutate_ the original code to the following:

```elixir
defmodule HelloWorld do
  def even?(x), do: rem(x, 2) >= 0 # == replaced by >=
end
```

Our test will still be green given `rem(2, 2)` yields `0`, which is of course still _greater than or equal to_ (`>=`) `0`.

This is what we refer to as a "live mutant". Code is changed, but the test still passes. For each test you run, which will contain a given mutation, you register if it passed (generated a live mutant) or failed (mutant is successfully killed). This will be important for actually using mutation testing in practice, which I will address later on in this post.

So, we changed our source code, and the test still passes. This says something about our tests. In this case in particular, it tells us we're not considering a scenario in which, the remainder of 2 being greater than 0, the return of the function should be `false` rather than `true`. If you think about what it means for a second, turns out we forgot to test the "odd cases":

```elixir
defmodule HelloWorldTest do
  use ExUnit.Case, async: true

  @subject HelloWorld

  test "when even" do
    assert @subject.even?(2) == true
  end

  test "when odd" do
    assert @subject.even?(3) == false
  end
end
```

Now one of the tests would still pass, but we'd have a new one that would fail. Summing it up, we have:

- 1 live mutant
    - test "when even", still passed after mutation
- 1 killed mutant
    - test "when odd", failed after mutation

It means we had a killed mutant rate of 1/2, which translates to 50% "mutation coverage."

### Using mutation testing

Using mutation testing "in the wild" can translate into running it as part of your CI pipeline on every merge to `master`. Each time you do that, your unit tests will run. If they pass, you can run a mutation suite and verify that your mutation coverage is above a specified threshold (e.g., 70%). Other options may ideally be passed to the mutation testing framework you're using so you can further tweak your mutation test suite. Such configurations might involve excluding certain files from mutation testing, only running it for specified folders, modifying the default threshold value, etc.<sup>1</sup>

# exavier

I've implemented the ideas of mutation testing into an Elixir library I called [`exavier`](https://github.com/dnlserrano/exavier). Its goal is to provide a full-blown mutation testing framework (think `ex_unit` for mutation testing with much worse performance and code quality at this point in time). You can run a set of mutation tests by doing:

`mix exavier.test`

The output would be something like the following:

```
......................

(...)

16) test when infinity (Elixir.HelloWorldTest)
  - if(y == :special) do
  -   :yes
  - else
  -   :no
  - end

  + if(true) do
  +   :yes
  + else
  +   :no
  + end

/Users/dnlserrano/Repos/exavier/test/hello_world_test.exs:10


22 tests, 6 failed (mutants killed), 16 passed (mutants survived)
27.27% mutation coverage
```

It reports each mutant that survived, alongside the mutation(s) made and shows an aggregate result of your mutation coverage.

## Mutators

Mutators specify ways in which we can mutate the code. Currently we have 5 proof-of-concept mutators available in `exavier`. It should be easy to extend the library with other mutators or even have the possibility (soon) to run your own custom mutators that live only inside your specific code-base, if that's more your thing.

Each mutator works by manipulating the [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of Elixir code, and that's part of what makes Elixir such a great fit for trying to develop such a testing framework in this language. Having so many powerful tools around code and the structure of that code in the language, it seemed like an amazing opportunity that shouldn't be missed. That and the fact it was fun, of course.

---

The library still needs a lot of work, particularly around adding more mutators and configurations. The major points I'd like to see tackled in the short-time are available in the ["To be done"](https://github.com/dnlserrano/exavier#to-be-done) section of the project's README.

I'd love to have some feedback about how you're using `exavier` and what we can, hopefully together as a community, do to make it better.

Happy mutations! 🖖

---

<sup>1</sup> A very well-known issue in mutation testing is that of [Equivalent Mutations](http://pitest.org/quickstart/basic_concepts/#equivalent-mutations), which is out of the scope of this blog post.
