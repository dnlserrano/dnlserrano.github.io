---
layout:     post
title:      "Playing with FFmpeg C code in Elixir"
subtitle:   "using NIFs to segfault the BEAM"
date:       2019-03-10 16:00:00
author:     "Daniel Serrano"
header-img: "img/elixir-nifs/cover.jpg"
header-img-author-name: "Photo Tractatus"
header-img-author-url: "https://www.flickr.com/photos/photo-tractatus/"
---

# Foreign Function Interface

[Foreign function interface](https://en.wikipedia.org/wiki/) is a well-known mechanism whereby a program written in language X interoperates with another program written in language Y.

This approach is useful in cases where, developing with language X, you realise you now have a very hard and complex problem that has been solved by a library written in that other language Y. One of such examples is dealing with video. [FFmpeg](http://ffmpeg.org/) is arguably the most common library for dealing with streams of video, and it is written in C. You can analyse metadata, manipulate the video by slicing it, extracting only the audio from it, you name it.

When I started looking into ways I could speed up an Elixir app that uses FFmpeg under the hood, I looked into NIFs as a way to avoid shelling out, and thus prevent [all the different problems](https://julialang.org/blog/2012/03/shelling-out-sucks) that come with it from happening, but particularly the _time spent_ on it. With that said, NIFs aren't a silver bullet either (far from it), but we'll go into that later on.

To interact with C code from Elixir using NIFs (Native Implemented Functions), you'll want to use [`erl_nif`](http://erlang.org/doc/man/erl_nif.html), the C library developed by the Erlang team to marshall/unmarshall Erlang terms back and forth into/from C-land.

# Hello World

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
cc -fPIC -I$ERL_ROOT/include -dynamiclib -undefined dynamic_lookup -o helloworld.so helloworld.c
```

_Note: `$ERL_ROOT` is used here to tell your C compiler where Erlang is installed in your machine. I've used `homebrew` to install Erlang, so it is under `/usr/local/lib/erlang/erts-10.2.3/`._

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

Then run it with:

```elixir
$> iex
iex> c "helloworld.ex"
[HelloWorld]
iex> HelloWorld.hello()
'Hello world, from C!'
```

And there you have it, a "Hello World" from the other side. The force is strong among us.

# FFmpeg

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

At the bottom there, you can see that we have 4 streams (`#0:0` through `#0:3`). We're going to try and get that same information by calling the C code directly, instead of shelling out to call `ffprobe` itself.

So let's start with our Elixir code and get that out of the way. The hardest part is going to happen next, with the C code!

```elixir
defmodule FFbindings do
  @on_load :load_nifs

  def load_nifs do
    :erlang.load_nif('./ffbindings', 0)
  end

  def file_info(path) when is_binary(path) do
    path
    |> String.to_charlist()
    |> get_file_info()
  end

  def file_info(path) when is_list(path) do
    path
    |> get_file_info()
  end

  def file_info(path), do: raise "invalid type for path: #{inspect(path)}"

  defp get_file_info(_path) do
    raise "NIF get_file_info/1 not implemented"
  end
end
```

So nothing special here. We get the file `path` as either a _binary_ or a _charlist_ and convert it to always deal with _charlists_. We pass that on to our NIF in C-land which will get us the metadata for the video. The interface for the NIF becomes pretty obvious by now. We will want it to receive a _charlist_ and return a _map_ with the video metadata.

The NIF signature on the C side is always the same:

- [`ErlNifEnv *env`](http://erlang.org/doc/man/erl_nif.html#ErlNifEnv), which represents the environment where we're hosting our Erlang terms
- `int argc`, indicating how many arguments were passed to our NIF from the Elixir side
- `const ERL_NIF_TERM argv[]`, containing each of the arguments passed to our NIF from the Elixir side

You can see it in action here:

```c
#define MAXBUFLEN 1024

static ERL_NIF_TERM
ffmpeg_get_file_info(ErlNifEnv *env, int argc, const ERL_NIF_TERM argv[]) {
  ...

  char path[MAXBUFLEN];
  (void)memset(&path, '\0', sizeof(path));
  enif_get_string(env, argv[0], path, sizeof(path), ERL_NIF_LATIN1);

  ...
}
```

First thing we have to do is extract the file path. For that, we reserve 1024 bytes to be able to store an arbitrarily long path, and hopefully that should be enough. We then set each of its characters to be `'\0'`, the special string terminator in C (so the string is correct when we copy `argv[0]` over it). All that's left is actually translating `argv[0]` (of type `ERL_NIF_TERM`) into a _"C string"_.

The way we translate an Erlang `ERL_NIF_TERM` representing an Erlang _charlist_ to a `char*` is using the `erl_nif.h` function [`enif_get_string()`](http://erlang.org/doc/man/erl_nif.html#enif_get_string):

- pass it the `env` (same as before)
- the `ERL_NIF_TERM` representing an Erlang charlist, `argv[0]`
- the destination `char*` variable, `path`
- the size of the destination `char*` variable, `sizeof(path)`
- the character encoding to be used (only `ERL_NIF_LATIN1` is available for now in Erlang)

_Note: Follow the entire code [here](https://github.com/dnlserrano/ffbindings/blob/master/ffbindings.c)._

Next, we'll want to, after some sanity checks, build the _map_ where we'll store the video metadata. I'll skip the validations for the sake of brevity and move right on to extracting the video format:

```c
ERL_NIF_TERM fileinfo;
ERL_NIF_TERM key;
ERL_NIF_TERM val;

fileinfo = enif_make_new_map(env);

/* format */
key = enif_make_string(env, "format", ERL_NIF_LATIN1);
val = enif_make_string(env, av_context->iformat->long_name, ERL_NIF_LATIN1);
enif_make_map_put(env, fileinfo, key, val, &fileinfo);
```

To unmarshall the file path _charlist_ from Erlang into C, we've previously used `enif_get_string()`. In order to marshall it, i.e., transform a C `char*` into an Erlang _charlist_, we'll want to use `enif_make_string()` instead. It just turns out that `erl_nif.h` follows this convention for pretty much any data type. Use `enif_get_...()` to convert from Erlang terms to C data types, and `enif_make_...()` to convert back from C to Erlang.

So, back to the code. We're creating a new Erlang _map_ in C-land, and for that we need to use `enif_make_new_map()`, which yields an `ERL_NIF_TERM` (representing a _map_). Then, we use two other `ERL_NIF_TERM`s to represent two _charlists_ which we'll use as the first key and value of our _map_ of video metadata:

- the key is the Erlang _charlist_ `'format'`, created with `enif_make_string()`
- the value is given by using `libavformat` (part of FFmpeg) to fetch the format name (present in `av_context->iformat->long_name` [\[1\]](https://github.com/FFmpeg/FFmpeg/blob/release/4.1/libavformat/avformat.h#L1344-L1349) [\[2\]](https://github.com/FFmpeg/FFmpeg/blob/release/4.1/libavformat/avformat.h#L640-L645))

At this point we would see the following if we were to return `fileinfo` back to Erlang and end this here:

```elixir
iex> FFbindings.file_info("bunny.mp4")
%{
  'format' => 'QuickTime / MOV'
}
```

But we're not done yet. 😈

We'd still like to, similar to what we saw before, get specific information for each one of the existing _streams_ in the video. For that, we can iterate `av_context->streams` and fetch the needed info from each of those streams.

```c
ERL_NIF_TERM streams[av_context->nb_streams];

int i;
for(i = 0; i < av_context->nb_streams; i++) {
  av_stream = av_context->streams[i];
  ERL_NIF_TERM stream = enif_make_new_map(env);

  /* type */
  key = enif_make_string(env, "type", ERL_NIF_LATIN1);
  val = enif_make_string(env, av_get_media_type_string(av_stream->codecpar->codec_type), ERL_NIF_LATIN1);
  enif_make_map_put(env, stream, key, val, &stream);

  ...
}
```

You can see it's pretty much the same thing as before, aside from the fact that we now need to use a somewhat esoteric function from FFmpeg to get the type correctly, but that's a minor detail. Building the Erlang terms (i.e., _charlists_) from C `char*`s is the same. Storing the key-value pair in the new `stream` _map_ (one for each stream) is also analogous.


```c
ERL_NIF_TERM streams[av_context->nb_streams];

int i;
for(i = 0; i < av_context->nb_streams; i++) {
  ...

  streams[i] = stream;
}

key = enif_make_string(env, "streams", ERL_NIF_LATIN1);
val = enif_make_list_from_array(env, streams, av_context->nb_streams);
enif_make_map_put(env, fileinfo, key, val, &fileinfo);
```

In the end, we create an Erlang _list_ of streams and add it to the `fileinfo` metadata _map_ for the video.

In [the full code snippet](https://github.com/dnlserrano/ffbindings/blob/master/ffbindings.c) you can also check how you could extract the duration of each stream (with some very questionable C floating point to integer arithmetic), and present that to the user as well.

Gluing it all together, you get something like this:

```elixir
iex> FFbindings.file_info("sample.mp4")
%{
  'format' => 'QuickTime / MOV',
  'streams' => [
    %{'duration' => 10, 'type' => 'video'},
    %{'duration' => 10, 'type' => 'audio'},
    %{'duration' => 10, 'type' => 'audio'},
    %{'duration' => 10, 'type' => 'data'}
  ]
}
```

This is cool and all, but as I've hinted at previously in this post NIFs are not a silver bullet. There are two major issues with them.

# Slowing down the BEAM

Long-running NIFs may starve Elixir/Erlang-defined code.

It's important to understand the concept of reductions and how the Erlang VM uses them to make everything work in a highly concurrent manner. The BEAM is a preemptive virtual-machine that yields processing after a process has consumed more than a certain number of reductions (i.e., units of work) since the last time it was selected for execution. When you call native code though you're outside the BEAM and so this concept of reductions disappears. With that, **time** becomes the best measurement. Or does it?

The Erlang team suggests a well-behaving native function is to return to its caller within 1 millisecond. Now, this can be hard to achieve, especially when you don't fully control the native library you're calling, which would be our case with FFmpeg. If we were to be in control, you could use yielding NIFs or threaded NIFs, which use clever ways to chunk the work or let the Erlang side know of the state of the native processing (`enif_consume_timeslice` to bump reductions from the C side). When you don't have that control though, and the native function runs for a long time, you can use the concept of a "dirty NIF" (either CPU or I/O bound). You specifically tell the Erlang VM it will have to look out for that NIF.

Then, if you have dirty schedulers support, the BEAM will create two extra types of schedulers besides the ordinary scheduler threads: a dirty scheduler for CPU-bound jobs and another one for I/O bound jobs, one of which will be used by your dirty NIF. In this way ordinary scheduler threads are not harassed by misbehaving native code.

_Note: The Erlang runtime without SMP support does not support dirty schedulers even when the dirty scheduler support is explicitly enabled._

# Segfaulting the BEAM

Crashing the BEAM is easier than you'd think.

In the Erlang docs you can read that a NIF _"is executed as a direct extension of the native code of the VM"_. What this means is that even though the BEAM can't reason about native code, it is intimately connected with it (given _"it is dynamically linked into the emulator process"_). Hence, if you have a problem in your native code, you might crash the entire VM, losing all of your long-running processes and state with it. This is definitely a deal breaker when it comes to delivering not only performant, but also **reliable** software. You don't want some C memory safety issue grinding your entire Erlang VM to a halt.

If you're feeling brave, you might want to try out [`rustler`](https://github.com/rusterlium/rustler), which implements a _"safe Rust bridge for creating Erlang NIF functions"_. It looks good and [apparently Discord is even using it in Production](https://twitter.com/lucianparvu/status/1100047500424167425)! With all its memory safety guarantees and data race free threading, Rust seems like the perfect fit for writing safe NIFs.

You can alternatively look for other ways of interacting with code outside the BEAM. In this post I've covered NIFs, but there are also Ports, port drivers, JInterface and C nodes.

# Conclusion

NIFs are not a silver bullet. Use them carefully. Or don't use them at all? From what I could read online, the talks I've watched and people I've talked to, it seems to me that [Ports](https://hexdocs.pm/elixir/Port.html) is what you want when you're working with something outside of the BEAM.

#### Links

Some useful links that helped me write this blog post follow:

- [Using C from Elixir with NIFs](https://andrealeopardi.com/posts/using-c-from-elixir-with-nifs)
- [Outside Elixir](https://www.theerlangelist.com/article/outside_elixir)
- [ElixirConf 2015 - Interoperability in Elixir: Dealing With the World Outside of the Beam](https://www.youtube.com/watch?v=b-xwM4i62q4)
- [`erl_nif`](http://erlang.org/doc/man/erl_nif.html)
- [Reductions in the Erlang BEAM machine](https://stackoverflow.com/questions/31751766/reductions-in-the-erlang-beam-machine)
- [Lukas Larsson - Understanding the Erlang Scheduler](https://www.youtube.com/watch?v=tBAM_N9qPno&t=33m55s)
- [Erlang/OTP 20.0 - Hacker News comments](https://news.ycombinator.com/item?id=14605726)
- [Future Extensions to the Native Interface](http://www.erlang-factory.com/upload/presentations/377/RickardGreen-NativeInterface.pdf)
- [Erlang Dirty Scheduler Overhead](https://medium.com/@jlouis666/erlang-dirty-scheduler-overhead-6e1219dcc7)
- [Respecting the scheduler in Erlang NIFs](https://rhye.org/post/native-scheduling-erlang/)
- [Rustler - Safe Elixir and Erlang NIFs in Rust](http://hansihe.com/2017/02/05/rustler-safe-erlang-elixir-nifs-in-rust.html)
- [Latency of Native Functions for Erlang and Elixir](https://potatosalad.io/2017/08/05/latency-of-native-functions-for-erlang-and-elixir)
- [GCC -fPIC option](https://stackoverflow.com/questions/5311515/gcc-fpic-option)
- [GCC Darwin Options](https://gcc.gnu.org/onlinedocs/gcc/Darwin-Options.html)
- [`ffmpeg-ruby`](https://github.com/lmars/ffmpeg-ruby)
- [`geef`](https://github.com/schacon/geef)
- [`markdown`](https://github.com/devinus/markdown)
