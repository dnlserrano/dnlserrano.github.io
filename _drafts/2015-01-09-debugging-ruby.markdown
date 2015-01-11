---
layout:     post
title:      "Debugging Ruby"
subtitle:   "killing puts one pry at a time"
date:       2015-01-09 22:13:00
author:     "Daniel Serrano"
header-img: "img/debugging-ruby/cover.jpg"
header-img-author-name: Gilad Benari
header-img-author-url: "https://www.flickr.com/photos/giladbenari/"
---

Following the principles transmitted by my teammates at Talkdesk, instilled on them throughout the blogs and books by software craftsman (and woman) like Michael Feathers, Sandi Metz and Uncle Bob just to name a few, I try to always write tests that cover the functionality I am implementing.

I cannot yet say I am truly following a *test-driven development* approach, since I still find myself falling into the implementation (almost unconsciously), eventually getting back to the tests. However, I push myself to stick with test-first and follow the Red, Green, Refactor cycle.

In this iterative process, one will often times run into some stone walls. I am talking about those tests that cannot seem to go from red to green no matter how immaculate your implementation is. You have bugs in your code, and you cannot seem to understand why or how they were introduced. What you know is that once you inspect your code, all will be clearer. So you do what you normally do:

```ruby
puts v1.inspect
```

This is ok for testing purposes, right? You can inspect the value of the suspicious variable. Maybe you will get a grasp of what happens and fix it right away. Great!

What happens when the code is more complex and you have suspicions (or worst, no suspicions at all) on several different variables? You might end up with *not-so-great* code like the following:

```ruby
puts "v1: #{v1.inspect} v2: #{v2.inspect} v3: #{v3.inspect}"
```

Again, this code does not have to be *great*. It can even be bad as hell, right? Afterall, it is not meant for production. And while that is true, you will spend a lot of time writing that sort of stuff.

-----

So the other day while I was reviewing a pull request from [@KnuX](https://twitter.com/KnuX), he told me he had a masterplan to secretly sneak the [pry](https://github.com/pry/pry) gem in to every Ruby project in Talkdesk. I had used pry before, and it seemed cool, but it did not stick with me. I was *putsing* my way through my Ruby programming... After talking a bit about it with him, I decided to give it a second try.

Pry is an alternative to `irb`. It enables what [the author](https://twitter.com/banisterfiend) calls *REPL driven programming*. Although his vision seems to be perfectly achievable considering the usefulness of this tool, I must confess I only use it for debugging purposes (at least yet). But is goes a long way in its debugging strand.

So, on to the real stuff. Instead of having to write a long `puts` statement, I just inline this in my code:

```ruby
require 'pry'; binding.pry
```

This will be a breakpoint in my code, in which I will be able to inspect variables much like you would do when you use `gdb` in C.

IMAGEM1 - repl pry parado

If I want to inspect variable `v1`, I just ask for its value in real time.

IMAGEM2 - repl pry revela valor de v1

If I want to check the value of a given function applied to a variable, I can do it too.

IMAGEM3 - repl pry revela valor de double(v2)

This is awesome! No more long `puts` and better, more powerful inspection!

One thing about `gdb` is that it provides `step`, `next`, `break`, etc. out of the box. This is what I would like *even more* in pry. Turns out this is not possible to have with "vanilla pry", but there is a whole community releasing plugins to pry, such as the awesome [pry-byebug](https://github.com/deivid-rodriguez/pry-byebug) which introduces the following commands:

- `step` to move inside the current instruction
- `next` to move past the current instruction
- `finish` to execute until the current stack frame returns (step out)
- `continue` to continue the program execution
- `break` to add a breakpoint

IMAGEM4 - reply pry depois de um step

This is über awesome! We can now inspect the flow of our programs in a much more controlled way. This helps a lot when debugging those reds you so eagerly want to turn green.

If you start using `pry` a lot, it might be useful for you to add the following to your `~/.pryrc`:

```ruby
if defined?(PryByebug)
  Pry.commands.alias_command 'c', 'continue'
  Pry.commands.alias_command 's', 'step'
  Pry.commands.alias_command 'n', 'next'
  Pry.commands.alias_command 'f', 'finish'
end
```

It will allow you to simple call `n` when you want to call `next`, and so on. I also recommend you reading through [the documentation of pry-byebug](https://github.com/deivid-rodriguez/pry-byebug#pry-byebug) to get a better grasp of its possibilities.

Say no to `puts`! Long live `binding.pry`!