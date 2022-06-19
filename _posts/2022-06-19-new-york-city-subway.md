---
layout:     post
title:      "New York city subway"
subtitle:   "a perfect abstraction for skip lists"
date:       2022-06-19 00:00:00
author:     "Daniel Serrano"
header-img: "img/new-york-city-subway/cover.jpg"
header-img-author-name: "Gemma Evans"
header-img-author-url: "https://unsplash.com/@stayandroam"
---

> **14.23.34.42.50.59.66.72**

Do you know what this sequence is?

About the New York city subway and computer science data structures — a blog post on real life city navigation and abstractions for efficient search.

---

If you live in New York city maybe you guessed it. The sequence represents a trip on the [New York city subway](https://www.nytimes.com/interactive/2019/12/02/nyregion/nyc-subway-map.html) (or so I'm told). Stops 14, 23, etc. up until 72.

The New York city subway is a skip list: it works just like the simple efficient dynamic randomised search structure created by [William Pugh](https://en.wikipedia.org/wiki/William_Pugh_(computer_scientist)) (1989). When you hop into the NYC subway you may use the express line to jump over stations you know you’re not interested in stopping at.

Going from 14 to 72 you may jump through 23, 50, 59, 66 by taking the express line. Now imagine doing that for linked lists for efficient searching. Instead of traversing the whole list, just jump through some elements on the list, like a pebble ricocheting over water.

<center><img src="/img/new-york-city-subway/pebble.png"/></center>

The numbered boxes (in yellow) at the bottom represent the ordered data sequence. Searching proceeds downwards from the sparsest subsequence at the top (express lines) until consecutive elements bracketing the search element are found.

<center><img src="/img/new-york-city-subway/skip-list.png"/></center>

Pugh proved average `O(log n)` complexity on both insertion and search with skipped elements being picked probabilistically, by means of randomising which nodes get promoted to an upper level, i.e., which nodes are "a part of the [multiple] express lines".

<center><img src="/img/new-york-city-subway/paper.png"/></center>

Compared with other efficient search structures (e.g., [treaps](https://en.wikipedia.org/wiki/Treap), [red-black trees](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree), [b-trees](https://en.wikipedia.org/wiki/B-tree)), the randomized balancing of skip lists has been argued to be easier to implement than the deterministic balancing schemes used in the aforementioned data structures.

<style>
.column {
  float: left;
  padding: 5px;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}

figure {
  text-align: center;
  font-style: italic;
  font-size: smaller;
  text-indent: 0;
  padding: 0.5em;
}
</style>

<div class="row">
  <div class="column" style="width:20%">
    <figure>
      <img src="/img/new-york-city-subway/treap.png" style="width:100%"/>
      <figcaption>Treap</figcaption>
    </figure>
  </div>
  <div class="column" style="width:40%">
    <figure>
      <img src="/img/new-york-city-subway/red-black-tree.png" style="width:100%"/>
      <figcaption>Red-black tree</figcaption>
    </figure>
  </div>
  <div class="column" style="width:40%">
    <figure>
      <img src="/img/new-york-city-subway/b-tree.png" style="width:100%"/>
      <figcaption>B-tree</figcaption>
    </figure>
  </div>
</div>

Skip lists also prove especially useful in parallel computing, where updates to different parts of the list may be done independently, hence being a great fit for designing highly scalable lock-free efficient search structures.

[Lucene](https://lucene.apache.org/), [Redis](https://redis.io/) and Google’s [LevelDB](https://github.com/google/leveldb) all use skip lists in their implementation.

<div class="row">
  <div class="column" style="width:33.3%">
    <img src="/img/new-york-city-subway/apache-lucene.png" style="width:100%"/>
  </div>
  <div class="column" style="width:33.3%">
    <img src="/img/new-york-city-subway/redis.png" style="width:100%"/>
  </div>
  <div class="column" style="width:33.3%">
    <img src="/img/new-york-city-subway/leveldb.png" style="width:100%"/>
  </div>
</div>

Credit for the NYC subway analogy goes to the brilliant Erik Demaine, a [professor of computer science at MIT](https://ocw.mit.edu/courses/6-046j-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-12-skip-lists/).

