---
layout:     post
title:      "A Case for Trailing Commas"
subtitle:   "advantages of a modest pattern"
date:       2015-07-29 00:40:00
author:     "Daniel Serrano"
header-img: "img/a-case-for-trailing-commas/cover.jpg"
header-img-author-name: "Gary Faulkner"
header-img-author-url: "https://www.flickr.com/photos/gary-faulkner/"
---

Talkdesk is growing and as that happens, we are expanding our engineering team outside of Portugal. Simon ([@O1O1O1O](https://github.com/O1O1O1O)) is the first engineer working from our San Francisco HQ. While he was reviewing a PR of mine a few days ago, he noticed my use of a trailing comma and wondered if it was intentional.

Here is the interaction:

![alt text](/img/a-case-for-trailing-commas/github.png "Code review")

The trailing comma was indeed intentional.

First, I proved I'm a big fan, as I had stated in my twitter account in the past. That's Proof #1 for you, right there:

<center><blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">i love me some trailing commas</p>&mdash; Daniel Serrano (@dnlserrano) <a href="https://twitter.com/dnlserrano/status/616387550245179392">July 1, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></center>

And there are reasons for that. But first, how did I get to trailing commas? Well, if you read my full interaction with Simon there, you've guessed it by now. I have been [learning Go](http://www.golang-book.com/books/intro) in my spare time. I am yet to code [my own package](https://golang.org/doc/code.html) (if you have any ideas about what I should do, please leave them in the comments below!).

Anyway, Go enfores the use of trailing commas. Now you may ask two things:

1. What is the advantage of using trailing commas?
2. Why does Go enforce the use of trailing commas?

> It's the little things.

-----

To answer the first question, I shared with Simon two links that I had ran into when reading about Go and particularly the use of trailing commas.

The link for Proof #2 (which, now that I think about it, doesn't really stand for proof that I love trailing commas) is [this one](https://github.com/bbatsov/ruby-style-guide/issues/273). It is a thread in a Github project for ["a" Ruby Style Guide™](https://github.com/bbatsov/ruby-style-guide). I would encourage anyone to give it a read. I consider there are some very valid points in favor, but YMMV.

For Proof #3, I brought a Go guru to the table: Dave Cheney. As you can read in my interaction with Simon, Dave is a [Go contributor](https://golang.org/CONTRIBUTORS#L176). He is an influent one (check out [his talk on Go and simplity](https://www.youtube.com/watch?v=_6AYkV2mz80) when you get the chance). He introduces the [benefits of trailing commas when working with a version control system](http://dave.cheney.net/2014/10/04/that-trailing-comma) (read: Git).

Overall, there are some arguments in favor and against, and the ones in favor completely win as far as I see it. Mainly because there are a lot of problems that I have myself faced when dealing with Ruby code. Here are some highlights:

- By using trailing commas, reorganizing lines in multi-line literals becomes way easier than when you're not using them.

```ruby
MY_HASH_WITH_VALUES = {
  :first_value  => 1,
  :third_value  => 3,
  :second_value => 2
}
```

Now imagine you want to change line 2 with line 3, of the hash key-values. In Sublime (yes, still at it :sadface:) I simply have to do `Ctrl + Cmd + Up`, `Ctrl + Cmd + Down` to move a line up and down. But I would still have to go and add a trailing comma to line 2 and remove the one from line 3 (if I consistently choose to follow the style of not using trailing commas).

```ruby
# move lines around
MY_HASH_WITH_VALUES = {
  :first_value  => 1,
  :second_value => 2,
  :third_value  => 3
}
```

- Multi-selection of words/expressions also becomes easier.

Another useful functionality that Sublime offers out-of-the-box is the multi-selection of words/terms (`Cmd + D`). For instance, if I wanted to turn the previous integer values into symbols (for some weird reason), I could not use the trailing comma (`,`) as the "compass character" (i.e., the character used to get to the integers), because in that way I would only be able to select the commas on the first two key-values.

```ruby
# multi selection
MY_HASH_WITH_VALUES = {
  :first_value  => :1, # changed
  :third_value  => :3, # changed
  :second_value => 2
}
```

Of course in this case, since we're using a hash, it would become easier, because we could use the hash rocket (`=>`) as the "compass character". Still, it becomes more difficult.

- Git diffs become cleaner

```ruby
# multi selection
MY_HASH_WITH_VALUES = {
  :first_value  => 1,
  :third_value  => 3,
  :second_value => 2, # changed
  :fourth_value => 4  # added
}
```

If you change an array to accomodate one more value, you don't have to get "two lines changed" in the diff (+2, -1). You should only get a line addition (+1) since that's what you went there to do!

- Git blames also become cleaner

Still regarding the previous change, it's easy to understand that `git blame` becomes harder since the exact commit over a given line might happen to be one of someone that had nothing to do with the addition of the key-value pair `:second_value => 2`. The person that changed that line might have only added the trailing comma to accomodate a new key-value pair in the hash. You can always look at the history, I know, but it's again that extra step that bothers me...

-----

But why does Go have this imposition after all?

Again, Dave Cheney comes to the rescue and hints for the reason in his blog post. A better explanation, I think, is given by Evan Shaw in [this Google Groups thread](https://groups.google.com/d/msg/golang-nuts/dYHeZKRjZPQ/KNIbK4DY5VEJ).

> It's because of automatic semicolon insertion. Semicolons are automatically inserted at the end of a line in many situations, including when the last token is a parenthesis.
> The comma tells the compiler "don't insert a semicolon here; this isn't the end of a statement."

More information about the semicolon rule [here](https://golang.org/doc/effective_go.html#semicolons).

-----

Right now you're probably thinking: "Look at this guy... He should spend more time on `vim` and less time writing about using trailing commas in Ruby, lol. He does not achieve half my productivity with that Sublime thing...".

While that might be true, I still consider that trailing commas are a valid style or pattern, whatever you want to call it. Wrapping this up: yes, I consider that using trailing commas enhances my productivity, even if by a small amount.

As Dave Cheney put it "It’s the little things that make the difference."
