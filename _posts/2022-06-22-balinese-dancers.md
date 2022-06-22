---
layout:     post
title:      "Balinese dancers"
subtitle:   "and their influence on cryptography"
date:       2022-06-22 00:00:00
author:     "Daniel Serrano"
header-img: "img/balinese-dancers/cover.jpg"
header-img-author-name: "Kharl Anthony Paica"
header-img-author-url: "https://unsplash.com/@kharlpaica"
---

When Balinese dancers are performing the Ramayana monkey chant dance, they move their hands and arms percussively.

<center><img src="/img/balinese-dancers/dance.gif"/></center>

---

[Secury Hashing Algorithms](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms) are a family of cryptographic hash functions published by [NIST](https://www.nist.gov/), a United States laboratory for the promotion of American innovation and industrial competitiveness by means of... you guessed it, establishing standards.

SHA-0 (fka "original SHA"), SHA-1, SHA-2 and SHA-3 are all a part of SHA. All of the algorithms up until SHA-3 (excluding), were designed by the [NSA](https://www.nsa.gov/) and all of them use the [Merkle–Damgård construction](https://en.wikipedia.org/wiki/Merkle%E2%80%93Damg%C3%A5rd_construction) method for building collision-resistant hashes (1979). SHA-3 is different, though. Read on.

The Merkle–Damgård construction used in SHA-{0,1,2} builds on one-way compression functions. It takes an initialization vector (`IV`), each block of the input a multiple of a fixed number (e.g., 512) and an (MD-compliant) padding. Sequentially, it will take the last result with the next block to create another result (by means of some function `f`). Once the final block (plus necessary padding, if any) is reached, finalisation is performed to output the final hash.

<center><img src="/img/balinese-dancers/merkle-damgard.png"/></center>

Phase outs of SHA-{0,1} started happening only long after various attacks on these SHA variants came to light, especially flaws related to collision resistance – known M1 and M2, `H(M1)=H(M2)`, or pre-image resistance – given known hash `h`, hard to find `H(M1)=h`.

In 2007, NIST announced an open competition for the creation of a better hash function, the natural successor to SHA-{0,1} and competitor to SHA-2 (many versions of it [accepted as secure still today](https://www.federalregister.gov/documents/2007/11/02/E7-21581/announcing-request-for-candidate-algorithm-nominations-for-a-new-cryptographic-hash-algorithm-sha-3)). Five years and [64 submissions](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7896.pdf) later, 5 finalists were found:

* BLAKE (Aumasson et al.)
* Grøstl (Knudsen et al.)
* JH (Hongjun Wu)
* Skein (Schneier et al.)
* Keccak (Keccak team, Daemen et al.)

In 2012, it was annouced that [the winner](https://www.nist.gov/news-events/news/2012/10/nist-selects-winner-secure-hash-algorithm-sha-3-competition) was **[Keccak](https://keccak.team/)**. Keccak revealed "large security margin after significant cryptanalytic effort" and "much better throughput/area performance in hardware [than competitors]".

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
  <div class="column" style="width:33.3%">
    <a href="/img/balinese-dancers/energy-per-bit.png" target="_blank">
      <img src="/img/balinese-dancers/energy-per-bit.png" style="width:100%"/>
    </a>
  </div>
  <div class="column" style="width:33.3%">
    <a href="/img/balinese-dancers/area-kgate.png" target="_blank">
      <img src="/img/balinese-dancers/area-kgate.png" style="width:100%"/>
    </a>
  </div>
  <div class="column" style="width:33.3%">
    <a href="/img/balinese-dancers/throughput-per-area.png" target="_blank">
      <img src="/img/balinese-dancers/throughput-per-area.png" style="width:100%"/>
    </a>
  </div>
</div>

And hence, Keccak became SHA-3.

SHA-3, uses a [sponge construction](https://en.wikipedia.org/wiki/Sponge_function) at its core. It is split into two phases: absorbing and squeezing. The absorbing phase runs for the whole padded blocks of input, interleaving applications of the function `f`. Squeezing happens afterwards where bits of the resulting state are again interleaved with applications of the function `f` to generate an arbitrary number of output blocks.

<center><img src="/img/balinese-dancers/sponge.png"/></center>

Circling back to the title, the name "Keccak" [is a variant spelling of "Kecak"](https://crypto.stackexchange.com/a/9975), the aforementioned type of [Balinese dance](https://www.youtube.com/embed/ViKT5gPoZW8). The story goes that in Kecak dancers move their hands fast and it looks like they are chopping and mixing something, and this reminded one of the co-authors of the algorithm about an hash function.

<center><img src="/img/balinese-dancers/keccak-team.jpeg" width=500/></center>

The Keccak team is Michaël Peeters, Guido Bertoni, Joan Daemen, Ronny Van Keer, Gilles Van Assche and Seth Hoffert.
