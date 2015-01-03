---
layout:     post
title:      "Chameleon Character"
subtitle:   "the horrible truth behind the non-breaking space"
date:       2015-01-03 02:34:00
author:     "Daniel Serrano"
header-img: "img/chameleon-character/cover.jpg"
header-img-author-name: Ivan Dupont
header-img-author-url: "https://www.flickr.com/photos/ivandupont/"
---

> I was not expecting that diff.

It all started around 4 p.m. in the afternoon of December 29th. It was a typical day at [Talkdesk](http://www.talkdesk.com/). But a `gf master`, followed by a `gm origin/master` (I use [aliases](https://github.com/sorin-ionescu/prezto/blob/master/modules/git/alias.zsh) courtesy of [prezto](https://github.com/sorin-ionescu/prezto)) would change it all.

After merging, I ran our front-end specs and got way too many errors. I started discussing with [@quimrstorres](https://twitter.com/quimrstorres) possible reasons for it to have happened as I happened to know he had been messing around with `master` not long before the *strange event*.

We quickly realized something must be very off for that to be happening. I finally narrowed my search down to one file (bare with me, I don't recall exactly how, but an error of some sort must have happened which allowed me to track that file). The line was this one:

```
if (_.isUndefined(this.collection)) { return false; }
```

Now, comes the weird part. I have been using [Sublime](http://www.sublimetext.com/) as my main text editor (since I am yet to be converted to Vimism — or [The Church of Emacs](https://www.youtube.com/watch?v=S76pHIYx3ik) for that matter) and I had been getting weird syntax errors in ruby *near* curly braces. I actually thought the error involved the curly braces themselves (some weird encoding I was inadvertently feeding Sublime with).

I would (wait for it...) *carefully re-write* my curly braces (and some characters near them, mostly spaces) and everything would then work as expected. I didn't know why this was happening in the first place or how I was being able to solve it, but *careful re-write* could not be the answer.

So, getting back to that line. Guess what? Yep, that's right, I *carefully re-wrote* the *curly braces surroundings* and everything just worked. We were now even more curious, so we diffed it and got the following:

![alt text](/img/chameleon-character/diff.png "The diff")

We were now pretty convinced something related to character enconding must be going the wrong way. But what could it be?

> This is strange.

I remembered something else. There was this interesting little program I had found to be very useful in situations such as this one. Again, I don't recall exactly why we were using it when I was first introduced to it by [@tjsousa](https://twitter.com/tjsousa). Meet [i](https://www.samba.org/ftp/unpacked/junkcode/i.c). This utility program (available in [Homebrew](https://github.com/Homebrew/homebrew/) via `brew install iprint`) returns a set of possible representations (decimal, hexadecimal, octal and binary) for the characters in a given string.

We gave it a shot. First, the sane line:

![alt text](/img/chameleon-character/good.png "The good")

Then, the ill-behaved one:

![alt text](/img/chameleon-character/found.png "The bad")

The space character (hex value `20`) had been replaced by two other bytes. There it was! But what did `C2 A0` mean, after all?

Turns out, in [UTF-8](http://www.utf8-chartable.de/) this translates to the non-breaking space character. This was our *chameleon character*. Instead of the *seemingly* normal space, me and [@quimrstorres](https://twitter.com/quimrstorres) were inadvertently inserting nbsps to our code. But why?

In Mac OS X Yosemite, you are able to insert the nsbp character by hitting `option + space`. This is also our shortcut to bring up [Alfred](http://www.alfredapp.com/). So, most of the time, when we hit the poisonous combo (responsible for generating nsbps), we get Alfred instead. But when we have another key in the mixture (namely `shift`) we effectively silence Alfred, letting Mac OS X interpret the unintended character. And that's exactly what happens when we have to write a curly brace. Out of habit, we will often times write a space before a curly brace (be it a closing `}` or opening one `{`), which in our *qwerty-based* fingers will sometimes cause us to be pressing shift even before we need to, leading to the following:

 1. `shift + (right) option + space` (notice the unnecessary shift)
 2. `shift + (right) option + 9` (for the closing curly brace, present in the snippet that caused all this)

I looked for a way to solve this permanently in OSX and found [this stackoverflow answer](http://superuser.com/a/142573). Basically, you just add the following key-bind to your `~/Library/KeyBindings/DefaultKeyBinding.dict` file (you might not have one yet):

```
{
"~ " = ("insertText:", " ");
}
```

In this way, I get completely rid of nbsps in all my applications. Other less invasive options include highlighting weird characters (this is what [@quimrstorres](https://twitter.com/quimrstorres) decided on, using Vim) or defining application-specific key-bindings (Sublime allows this, for example).

Stick around for the next post!