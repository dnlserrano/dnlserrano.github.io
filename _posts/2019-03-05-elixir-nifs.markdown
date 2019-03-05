---
layout:     post
title:      "Playing with FFmpeg C code in Elixir"
subtitle:   "using NIFs to segfault the BEAM"
date:       2019-03-05 09:00:00
author:     "Daniel Serrano"
header-img: "img/elixir-nifs/cover.jpg"
header-img-author-name: "Photo Tractatus"
header-img-author-url: "https://www.flickr.com/photos/photo-tractatus/"
---

[Foreign function interface](https://en.wikipedia.org/wiki/) is a well-known mechanism whereby a program written in language X interoperates with another program written in language Y.

This approach is useful in cases where, developing with language X, you realise you now have a very hard and complex problem that has been solved by a library written in that other language Y. One of such examples is dealing with video. [FFmpeg](http://ffmpeg.org/) is arguably the most common library for dealing with streams of video, and it is written in C. You can analyse metadata, manipulate the video by slicing it, extracting only the audio from it, you name it.

When I started looking into ways I could speed up an Elixir app that uses FFmpeg under the hood, I looked into NIFs as a way to avoid shelling out, and thus prevent [all the different problems](https://julialang.org/blog/2012/03/shelling-out-sucks) that come with it from happening, but particularly the _time spent_ on it. With that said, NIFs aren't a silver bullet either (far from it), but we'll go into that later on.

To interact with C code from Elixir using NIFs (Native Implemented Functions), you'll want to use [`erl_nif`](http://erlang.org/doc/man/erl_nif.html), the C library developed by the Erlang team to marshall/unmarshall Erlang terms back and forth into/from C-land.

The "Hello World" example goes something like this. On the C side:

```c
/* helloworld.c */

#include <erl_nif.h>

/* function that returns ERL_NIF_TERM, i.e., an Erlang term in C-land */
static ERL_NIF_TERM hello(ErlNifEnv* env, int argc, const ERL_NIF_TERM argv[]) {
  return enif_make_string(env, "Hello world, from C!", ERL_NIF_LATIN1);
}

/* declare functions to export (and corresponding arity) */
static ErlNifFunc nif_funcs[] = {
  {"hello", 0, hello}
};

/* actually export the functions previously declared */
ERL_NIF_INIT(Elixir.HelloWorld, nif_funcs, NULL, NULL, NULL, NULL);
```

Compile it to `helloworld.so` with:

```sh
cc -fPIC -I/usr/local/lib/erlang/erts-10.2.3/include -dynamiclib -undefined dynamic_lookup -o helloworld.so helloworld.c
```

On the Elixir side:

```elixir
# helloworld.ex

defmodule HelloWorld do
  # when module is loaded, load NIFs
  @on_load :load_nifs

  # call Erlang function to load NIF with specific name
  # in our case ./helloworld, previously compiled
  def load_nifs do
    :erlang.load_nif('./helloworld', 0)
  end

  # leave a default implementation in case NIF is not available
  def hello do
    raise "NIF hello/0 not implemented"
  end
end
```

_Note: `/usr/local/lib/erlang/erts-10.2.3/` is sometimes referred to as `$ERL_ROOT`. It is used here to tell your C compiler where Erlang is installed in your machine. I've used `homebrew` to install it on mine._

Then run it with:

```elixir
$> iex
iex> c "helloworld.ex"
[HelloWorld]
iex> HelloWorld.hello()
'Hello world, from C!'
```

And there you have it, a "Hello World" from the other side. The force is strong among us.

Now, for FFmpeg, it gets a bit trickier. We will need to know what to look for. For this toy example we will want to get info that is available when we run `ffprobe`, which ships with `ffmpeg` and allows to get some metadata info on a given video file.

```sh
$> ffprobe sample.mp4
ffprobe version 4.1 Copyright (c) 2007-2018 the FFmpeg developers
  built with Apple LLVM version 8.0.0 (clang-800.0.42.1)
  configuration: --prefix=/usr/local/Cellar/ffmpeg/4.1_6 --enable-shared --enable-pthreads --enable-version3 --enable-hardcoded-tables --enable-avresample --cc=clang --host-cflags=-I/System/Library/Frameworks/JavaVM.framework/Versions/Current/Headers/ --host-ldflags= --enable-ffplay --enable-gnutls --enable-gpl --enable-libaom --enable-libbluray --enable-libmp3lame --enable-libopus --enable-librubberband --enable-libsnappy --enable-libtesseract --enable-libtheora --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-libxvid --enable-lzma --enable-libfontconfig --enable-libfreetype --enable-frei0r --enable-libass --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-librtmp --enable-libspeex --enable-videotoolbox --disable-libjack --disable-indev=jack --enable-libaom --enable-libsoxr
  libavutil      56. 22.100 / 56. 22.100
  libavcodec     58. 35.100 / 58. 35.100
  libavformat    58. 20.100 / 58. 20.100
  libavdevice    58.  5.100 / 58.  5.100
  libavfilter     7. 40.101 /  7. 40.101
  libavresample   4.  0.  0 /  4.  0.  0
  libswscale      5.  3.100 /  5.  3.100
  libswresample   3.  3.100 /  3.  3.100
  libpostproc    55.  3.100 / 55.  3.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'sample.mp4':
  Metadata:
    major_brand     : mp42
    minor_version   : 0
    compatible_brands: mp42isomavc1
    creation_time   : 2012-03-13T08:58:06.000000Z
    encoder         : HandBrake 0.9.6 2012022800
  Duration: 00:00:10.03, start: 0.000000, bitrate: 629 kb/s
    Chapter #0:0: start 0.000000, end 10.000000
    Metadata:
      title           : Chapter 1
    Stream #0:0(und): Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, smpte170m/smpte170m/bt709), 320x176, 300 kb/s, 25 fps, 25 tbr, 90k tbn, 180k tbc (default)
    Metadata:
      creation_time   : 2012-03-13T08:58:06.000000Z
      encoder         : JVT/AVC Coding
    Stream #0:1(und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 160 kb/s (default)
    Metadata:
      creation_time   : 2012-03-13T08:58:06.000000Z
    Stream #0:2(und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 160 kb/s
    Metadata:
      creation_time   : 2012-03-13T08:58:06.000000Z
    Stream #0:3(und): Data: bin_data (text / 0x74786574), 0 kb/s
    Metadata:
      creation_time   : 2012-03-13T08:58:06.000000Z
```

_Note: The sample video and accompanying code can be found [here](https://github.com/dnlserrano/ffbindings/)._

At the bottom there, you can see that we have 4 streams (#0:0 through #0:3). We're going to try and get that same information by calling the C code directly, instead of shelling out to call `ffprobe` itself.

Some useful links that helped me write this blog post follow:

- [https://andrealeopardi.com/posts/using-c-from-elixir-with-nifs](https://andrealeopardi.com/posts/using-c-from-elixir-with-nifs)
- [http://erlang.org/doc/man/erl_nif.html](http://erlang.org/doc/man/erl_nif.html)
- [https://github.com/lmars/ffmpeg-ruby](https://github.com/lmars/ffmpeg-ruby)
- [https://github.com/schacon/geef](https://github.com/schacon/geef)
- [https://github.com/devinus/markdown](https://github.com/devinus/markdown)
- [https://stackoverflow.com/questions/5311515/gcc-fpic-option](https://stackoverflow.com/questions/5311515/gcc-fpic-option)
- [https://gcc.gnu.org/onlinedocs/gcc/Darwin-Options.html](https://gcc.gnu.org/onlinedocs/gcc/Darwin-Options.html)
