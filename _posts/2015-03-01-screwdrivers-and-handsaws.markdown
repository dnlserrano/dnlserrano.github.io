---
layout:     post
title:      "Screwdrivers and Handsaws"
subtitle:   "my do-it-fast-do-it-good toolbox"
date:       2015-03-01 20:10:00
author:     "Daniel Serrano"
header-img: "img/screwdrivers-and-handsaws/cover.png"
header-img-author-name: "Dan Anderson"
header-img-author-url: "https://www.flickr.com/photos/stonebridgedapper/"
---

Tom Preston-Werner, one of the co-founders of GitHub, creator of Gravatar and Jekyll (on which this blog runs) recently tweeted:

<center><blockquote class="twitter-tweet" lang="en"><p>I love trivial but super useful utility websites like <a href="http://t.co/pzvLfbfLpy">http://t.co/pzvLfbfLpy</a> and <a href="http://t.co/dkhf7qgygE">http://t.co/dkhf7qgygE</a>. What are your favorites?</p>&mdash; Tom Preston-Werner (@mojombo) <a href="https://twitter.com/mojombo/status/555121976155865088">January 13, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></center>

This led me to ponder about what are *my* most used utility websites, programs, tools, plugins, etc. I thought I'd share them with you.

This list serves three purposes. Firstly, it serves as a thank you note to the people behind each one of the referenced utilities. It is also a simple reminder that sometimes we should mind the little things. Finally, it is an excuse for me to show what I consider to be a set of cool assets that anyone can use.

- [__rubular.com__](http://www.rubular.com/) by [Michael Lovitt](https://twitter.com/lovitt) *(how cool of a surname is that?)*

> Rubular is a Ruby-based regular expression editor. It's a handy way to test regular expressions as you write them.

How many times did you have to test a regex against a given set of sentences and iterate on it until you got it to cover every corner case? *Rubular* makes it easy and fast to test that out. It's true that regex is not a great part of my programming activity (I believe that if you are using it too much, maybe there is a better way to do it), but when a situation arises in which regexes are needed, *Rubular* has proved to be very helpful.

- [__jsonlint.com__](http://jsonlint.com/) by [Arc90 Lab](http://lab.arc90.com/)

*JSON lint* is a clean and simple linter for parsing and formatting JSON text.

Lately I've been working with a lot of external APIs which are in most of the cases [JSON-powered](https://twitter.com/tproger/status/561115115383443456). Because of that, *JSON lint* has become one of my top utility websites. Whether be it because I am doing something wrong when trying to POST data to the external service I'm interacting with, because I want to understand how to correctly parse the error messages or simply because I want to have a more structured (i.e., formatted) view of the service response. It is a must.

- [__getpostman.com__](http://www.getpostman.com/)

> Create and send any HTTP request using the awesome Postman request builder. (...) With Postman, you can construct simple as well as complex requests quickly, save them for later use and analyze the response sent by the API. Postman can dramatically cut down the time required to test and develop APIs.

Continuing on the API madness, I use the [Postman REST client Chrome extension](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop) mostly for testing our internal APIs at [Talkdesk](http://www.talkdesk.com/).

- [__`gh`__](https://github.com/jasonmccreary/gh) by [Jason McCreary](https://twitter.com/gonedark)

Shell script `gh` is a really simple tool to open the GitHub page of a given branch of a repository. The following gif exemplifies the usage of `git-open`, which is based off of `gh`.

![git-open](https://cloud.githubusercontent.com/assets/39191/5889192/244a0b72-a3d0-11e4-8ab9-55fc64228aaa.gif)

It is pretty much [all the same](https://github.com/paulirish/git-open#thx). Instead of doing `git open` like it is shown in the gif, I just type `gh`. This is useful to open a new Pull Request right after that last push or simply visually checking the state of a given branch upstream.

- [__projectnaptha.com__](https://projectnaptha.com/) by [Kevin Kwok](https://twitter.com/antimatter15)

> Project Naptha: a browser extension that enables text selection on any image

This project showed up on [Hacker News](https://news.ycombinator.com/item?id=7629396) a while back. It has as much of interesting as of useful. Haven't you had times in which you want to search for the text present in an image, or even just copy it for some reason? This Chrome extension allows just that.

I am sure there are others I could have mentioned, but a top 5 seems reasonable enough.

What are some of *your* favorite utility websites or tools?