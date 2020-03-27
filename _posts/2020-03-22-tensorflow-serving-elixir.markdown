---
layout:     post
title:      "Tensorflow Serving in Elixir"
subtitle:   "teaching Elixir how to guess hand-written digits"
date:       2020-03-22 16:40:00
author:     "Daniel Serrano"
header-img: "img/tensorflow-serving-elixir/cover.png"
---

I've been learning more about [Tensorflow Serving](https://www.tensorflow.org/tfx/guide/serving) lately. If you are where I was at around a month ago and you're not super familar with it, TF Serving is a "flexible, high-performance serving system for machine learning models, designed for production environments." Follow a set of conventions ([over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)), and you can get a Tensorflow model up and running faster than ever before, powered by highly-optimised C++ code that runs blazingly fast. It is the _de facto_ way of isolating your TF models into a specific microservice capable of serving multiple versions of your trained algorithms.

Provided you have a TF model, TF Serving allows you to expose either a REST or gRPC interface to interact with it. Given all the [bespoken advantages of gRPC](https://www.youtube.com/watch?v=RoXT_Rkg8LA), I wanted to give calling TF Serving via gRPC from Elixir a try.

# Serving a Tensorflow model

Since I'm more interested in Computer Vision problems, I looked for something easy to start with. [Tensorflow Hub](https://tfhub.dev/) seemed like a good starting point, but I ended up going for a pre-trained handwritten digits model I found [on GitHub](https://github.com/EN10/KerasMNIST) in [HDF5](https://en.wikipedia.org/wiki/Hierarchical_Data_Format) (`.h5`), trained on the well-known [MNIST dataset](https://en.wikipedia.org/wiki/MNIST_database).

![](/img/tensorflow-serving-elixir/mnist.png)

In order to serve a model via Tensorflow Serving though, we need to use the [SavedModel format](https://www.tensorflow.org/guide/saved_model), "a complete TensorFlow program, including weights and computation." Converting a Keras-saved HDF5 model to the SavedModel format is as simple as [loading it](https://www.tensorflow.org/tutorials/keras/save_and_load#hdf5_format) and then [saving it in the desired format](https://www.tensorflow.org/tutorials/keras/save_and_load#savedmodel_format). Once that's done, we're ready to run the model in TF Serving. In Python land:

```python
import tensorflow as tf

model = tf.keras.models.load_model('cnn.h5')
tf.saved_model.save(model, 'digits/1/')
```

Then just run it with:

```bash
docker run -p 8501:8501 -p 8500:8500 \
  --mount type=bind,source=/path/to/digits,target=/models/digits \
  -e MODEL_NAME=digits -t tensorflow/serving &
```

In this case, I'm exposing both the REST and the gRPC interfaces.

If you go to [`http://localhost:8501/v1/models/digits/versions/1/metadata`](http://localhost:8501/v1/models/digits/versions/1/metadata), you should see something like the following:


```javascript
{
  "model_spec": {
    "name": "digits",
    "signature_name": "",
    "version": "1"
  },
  "metadata": {
    "signature_def": {
      "signature_def": {
        "__saved_model_init_op": {
          "inputs": {},
          "outputs": {
            "__saved_model_init_op": {
              "dtype": "DT_INVALID",
              "tensor_shape": {
                "dim": [],
                "unknown_rank": true
              },
              "name": "NoOp"
            }
          },
          "method_name": ""
        },
        "serving_default": {
          "inputs": {
            "conv2d_1_input": {
              "dtype": "DT_FLOAT",
              "tensor_shape": {
                "dim": [{
                    "size": "-1",
                    "name": ""
                  },
                  {
                    "size": "28",
                    "name": ""
                  },
                  {
                    "size": "28",
                    "name": ""
                  },
                  {
                    "size": "1",
                    "name": ""
                  }
                ],
                "unknown_rank": false
              },
              "name": "serving_default_conv2d_1_input:0"
            }
          },
          "outputs": {
            "dense_2": {
              "dtype": "DT_FLOAT",
              "tensor_shape": {
                "dim": [{
                    "size": "-1",
                    "name": ""
                  },
                  {
                    "size": "10",
                    "name": ""
                  }
                ],
                "unknown_rank": false
              },
              "name": "StatefulPartitionedCall:0"
            }
          },
          "method_name": "tensorflow/serving/predict"
        }
      }
    }
  }
}
```

This should match what you see when inspecting the model via `saved_model_cli`:

```
saved_model_cli show --dir digits/1 --tag_set serve --signature_def serving_default
```

```
The given SavedModel SignatureDef contains the following input(s):
  inputs['conv2d_1_input'] tensor_info:
      dtype: DT_FLOAT
      shape: (-1, 28, 28, 1)
      name: serving_default_conv2d_1_input:0
The given SavedModel SignatureDef contains the following output(s):
  outputs['dense_2'] tensor_info:
      dtype: DT_FLOAT
      shape: (-1, 10)
      name: StatefulPartitionedCall:0
Method name is: tensorflow/serving/predict
```

The output describes a model that takes a 28x28x1 matrix of floats as its input tensor tagged `conv2d_1_input`, and it yields an output tensor of 10 floats tagged `dense_2`.

You might have concluded by now the model takes 28x28 black-and-white images, hence the extra 1-channel dimension for black or white (0 and 1, respectively); and it returns different confidence values for each digit from 0 to 9, hence the 10 floats output.

# Tensorflow Serving from Elixir

I wanted to experiment with gRPC and the Tensorflow Serving gRPC interface specifically. It was a great coincidence that shortly before I started with this experiment, the great Andrea Leopardi published a blog post about ["sharing Protobuf schemas across services."](https://andrealeopardi.com/posts/sharing-protobuf-schemas-across-services/)

For the Elixir implementation of gRPC, I went with [`elixir-grpc/grpc`](https://github.com/elixir-grpc/grpc) by another great one from the Elixir community, [Tony Han](https://github.com/tony612). Since he has done work on `elixir-grpc/grpc`, associated with the feedback I had from the aforementioned post about [`protobuf-elixir`](https://github.com/tony612/protobuf-elixir), choosing this project for generating Elixir code from Protobufs didn't seem like a bad idea. And it wasn't! More on that next.

Tensorflow and TF Serving provide great out-of-the-box APIs for Python based on the different language-agnostic Protobufs. One such case of that are the [prediction APIs](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/apis/prediction_service_pb2_grpc.py) based on [`prediction_service.proto`](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/apis/prediction_service.proto). After I [experimented with it in Python](https://github.com/dnlserrano/tensorflow-serving-grpc-python-example/blob/master/tfserving_grpc_py/app.py), given the lower barrier for prototyping, I was confident it should be simple enough to replicate a similar interaction in Elixir (provided the gods of gRPC and HTTP/2 had worked in my favour - Tony Han, creator of `grpc-elixir/grpc` and [Loïc Hoguin](https://github.com/essen), creator of [`cowboy`](https://github.com/ninenines/cowboy) did 🙏).

I generated the Elixir code given the necessary Protobufs (under `protos/`):

```bash
protoc --elixir_out=plugins=grpc:./lib/messages \
  protos/tensorflow/core/framework/* \
  protos/tensorflow_serving/apis/* \
  protos/google/protobuf/* \
  -I protos
```

In the end, the `messages/` directory contained the generated Elixir code, with nice structs I could leverage to call TF Serving from Elixir. 😊

# Media manipulation in Elixir

Another challenge when doing Computer Vision with Elixir is the support for media manipulation. Resizing images, extracing frames from videos, etc. can either be done by shelling out to applications such as [ImageMagick](https://imagemagick.org/) or [FFmpeg](http://ffmpeg.org/), or by making use of [(dirty) NIFs](2019/03/10/elixir-nifs), Ports, port drivers or _"equivalent alternatives"_ (out of scope of this blog post). TL;DR is I ended up using a mixture of both, because I was being hacky.

For resizing my images to 28x28 1-channel black-and-white thumbnails, I ended up using [ImageMagick's `convert`](https://github.com/dnlserrano/tf-serving-elixir/blob/master/lib/tfserving/digits.ex#L12-L16). ✨ Who would have said there were so many [dithering algorithms](https://en.wikipedia.org/wiki/Dither#Algorithms) out there?

```elixir
{_, 0} = System.cmd(
  "convert",
  ~w(#{input_file} -resize 28x28^ -dither FloydSteinberg -set background white
  -flatten -colors 2 -gravity center -extent 28x28 #{output_file})
)
```

To translate the 1-channel pixels to arrays of 0, 1 values, I used [Arjan Scherpenisse](https://github.com/arjan)'s [pixels](https://github.com/arjan/pixels/) library (which I got to know in [his awesome talk](https://fosdem.org/2020/schedule/event/beam_keep_calm_use_nerves/) about Nerves). I'm sure I could have been smarter here (piping the resulting image somehow to the running Elixir process and avoiding having to use this NIF), but again... I was being scrappy. And `pixels` is awesome, by the way. It integrates with both `lodepng` and `ujpeg`. Thanks Arjan!

```elixir
{:ok, %{data: pixels_binary}} = Pixels.read_file(output_file)
pixels = :erlang.binary_to_list(pixels_binary)

input =
  pixels
  |> Enum.chunk_every(4)
  |> Enum.map(fn [r, g, b, _] ->
    case (r + g + b) / 3 > 128 do
      true -> 0
      _ -> 1
    end
  end)
```

# Putting it all together

Having all of these bits and pieces in place, we're left with sending the actual input to TF Serving and making sense of what it returns back. At this point we have the input (or kind of) and we have the Elixir structs to talk gRPC with TF Serving.

[Building the request](https://github.com/dnlserrano/tf-serving-elixir/blob/master/lib/tfserving/digits.ex#L31-L49) entails defining a `PredictRequest` containing `inputs` and a model specification (`model_spec`). As previously mentioned, the name of the input is in this case `"conv2d_1_input"` and it is of type float (`:DT_FLOAT`). The input is a 28x28x1 tensor with arbitrary number of batches (we use a batch of 1 image, but you could evaluate more in one single network call). The value itself, is passed as a vector of size 784 (28 * 28), named `input` in the code that follows:

```elixir
request =
  Tensorflow.Serving.PredictRequest.new(
    inputs: %{
      "conv2d_1_input" => Tensorflow.TensorProto.new(
        dtype: :DT_FLOAT,
        tensor_shape: Tensorflow.TensorShapeProto.new(
          dim: [
            Tensorflow.TensorShapeProto.Dim.new(size: 1),
            Tensorflow.TensorShapeProto.Dim.new(size: 28),
            Tensorflow.TensorShapeProto.Dim.new(size: 28),
            Tensorflow.TensorShapeProto.Dim.new(size: 1),
          ],
          unknown_rank: false
        ),
        float_val: input
      ),
    },
    model_spec: Tensorflow.Serving.ModelSpec.new(name: "digits")
  )
```

We then [make the request](https://github.com/dnlserrano/tf-serving-elixir/blob/master/lib/tfserving/digits.ex#L51-L53) and [return back the _guessed_ digit](https://github.com/dnlserrano/tf-serving-elixir/blob/master/lib/tfserving/digits.ex#L55-L59), for which the ML algorithm yielded the highest score:

```elixir
{:ok, channel} = GRPC.Stub.connect("#{tf_serving_host()}:8500")
{:ok, %Tensorflow.Serving.PredictResponse{outputs: outputs}} =
  Tensorflow.Serving.PredictionService.Stub.predict(channel, request)

digit =
  outputs["dense_2"].float_val
  |> Enum.with_index()
  |> Enum.max_by(fn {val, _} -> val end)
  |> elem(1)
```

Try it out below!

<div align="center" style="padding-left: 75px">
  <iframe src="https://digits.dnlserrano.dev" width="300" height="300" frameBorder="0">Browser not compatible.</iframe>
</div>

What's happening here is we're providing a UI where the user can draw a digit, we then convert the content in the Canvas element to a Base64-encoded image that is sent to the backend. There, we resize it and apply it the need transformations before we send it to the TF Serving model. I then `Docker`ized it and `docker-compose`d it. 👨‍🍳

Find the whole code over at [my GitHub](https://github.com/dnlserrano/tf-serving-elixir).

# Wrapping up

And that's it. Elixir calling via gRPC a Machine Learning model deployed using Tensorflow Serving. It's possible, today!

![](/img/tensorflow-serving-elixir/end.png)

Sure, there are some rough edges. The support for gRPC isn't 100% mature in `elixir-grpc/grpc` (I had to point to `master` branches for some of its dependencies in order to get the latest fixes for existing bugs). The "media manipulation ecosystem" in Elixir could also be better, but you can already go a long way (particularly with dirty NIFs). And if we push a bit, we can make it even better! ❤️

Happy Tensorflow Serving... in Elixir! 🤖
