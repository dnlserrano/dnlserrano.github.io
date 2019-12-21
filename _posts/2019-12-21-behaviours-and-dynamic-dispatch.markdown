---
layout:     post
title:      "Behaviours and <br/>Dynamic dispatch"
subtitle:   "making way for the template method pattern"
date:       2019-12-21 15:43:22
author:     "Daniel Serrano"
header-img: "img/behaviours-and-dynamic-dispatch/cover.jpg"
header-img-author-name: "Jason Betz"
header-img-author-url: "https://unsplash.com/@jason_betz"
---

This is going to be a quick one.

Recently I had the opportunity to take part in the refactoring of some Elixir code.

It looked something like this. Picture more interesting (and complex) logic in place of the classic, old and honestly a bit boring beverages example:

```elixir
defmodule Beverages do
  def prepare(beverage_type) do
    with :ok <- roll_up_sleeves(),
         {:ok, quantity} <- random_quantity(),
         {:ok, preparation} <- prepare_it(beverage_type, quantity),
         {:ok, _beverage} <- serve_it(preparation) do
      {:ok, "happy days!"}
    else
      error -> {:error, error}
    end
  end

  defp random_quantity, do: {:ok, Enum.random(30..40)}

  defp roll_up_sleeves do
    "rolling up sleeves to start working" |> IO.puts()
  end

  defp prepare_it(:coffee, quantity) do
    "getting #{quantity}gr of beautiful Peruvian coffee beans" |> IO.puts()
    {:ok, "prepped with the finest coffee ☕️"}
  end

  defp prepare_it(:tea, quantity) do
    "getting #{quantity}gr of mixed Indian Assam leaves, brisk Ceylon and bright Kenyan teas"
    |> IO.puts()

    {:ok, "prepped with the finest teas 🍵"}
  end

  defp serve_it(preparation) do
    served = "ready to drink beverage " <> preparation
    served |> IO.puts()
    {:ok, served}
  end
end
```

We wanted to move away from pattern-matching on atoms (first function argument) as a way of forking to different implementations **in the same module**. [Single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) anyone?

Our goal was to split the logic in various different modules, given we would now need to add another beverage type: the lemonade. The logic inside each was also more complex than in this toy example.

This split would make it easier to reason about each one of the beverage types and the way they differ from each other, while hopefully still keeping the comon logic in a central place that privileges [_dryness_](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Furthermore, having each of them as separate modules made it simpler to test them (each one in isolation) and also to extend them (both now given the new business requirements, and in the future in case yet another beverage comes along).

Besides all this, we were also not following a specific way of properly documenting the fact that each of the specific beverage implementations needed to respect a well-defined interface. [Smells like ~~teen spirit~~](https://www.youtube.com/watch?v=hTWKbfoikeg) Elixir behaviours.

After doing some quick research over the Elixir hexdocs and official pages, we eventually hit gold when we came across the recommended way of doing ["dynamic dispatching" in Elixir](https://elixir-lang.org/getting-started/typespecs-and-behaviours.html#dynamic-dispatch).

So we changed it to this:

```elixir
defmodule NewBeverages do
  @type quantity :: integer()
  @type preparation :: binary()
  @callback prepare_it(quantity) :: {:ok, preparation}

  def prepare(beverage_type) do
    beverage_impl = beverage_for(beverage_type)

    with :ok <- roll_up_sleeves(),
         {:ok, quantity} <- random_quantity(),
         {:ok, preparation} <- beverage_impl.prepare_it(quantity),
         {:ok, _beverage} <- serve_it(preparation) do
      {:ok, "happy days!"}
    else
      error -> {:error, error}
    end
  end

  defp beverage_for(:coffee), do: NewBeverages.Coffee
  defp beverage_for(:tea), do: NewBeverages.Tea
  defp beverage_for(:lemonade), do: NewBeverages.Lemonade

  defp random_quantity, do: {:ok, Enum.random(30..40)}

  defp roll_up_sleeves do
    "rolling up sleeves to start working" |> IO.puts()
  end

  defp serve_it(preparation) do
    served = "ready to drink beverage " <> preparation
    served |> IO.puts()
    {:ok, served}
  end
end
```

```elixir
defmodule NewBeverages.Coffee do
  @behaviour NewBeverages

  def prepare_it(quantity) do
    "getting #{quantity}gr of beautiful Peruvian coffee beans" |> IO.puts()
    {:ok, "prepped with the finest coffee ☕️"}
  end
end
```

```elixir
defmodule NewBeverages.Tea do
  @behaviour NewBeverages

  def prepare_it(quantity) do
    "getting #{quantity}gr of mixed Indian Assam leaves, brisk Ceylon and bright Kenyan teas"
    |> IO.puts()

    {:ok, "prepped with the finest teas 🍵"}
  end
end
```

```elixir
defmodule NewBeverages.Lemonade do
  @behaviour NewBeverages

  def prepare_it(quantity) do
    "getting #{quantity}ml of hearty lemon juice" |> IO.puts()
    {:ok, "prepped with the finest lemon 🍋"}
  end
end
```

We making lemonade, boy.

```
> NewBeverages.prepare(:lemonade)
rolling up sleeves to start working
getting 32ml of hearty lemon juice
ready to drink beverage prepped with the finest lemon 🍋
{:ok, "happy days!"}
```

You can easily extend lemonade to do crazy things other beverages don't need to do as part of preparing your beverage (`prepare_it/1`) without polluting the "orchestrator module". Buy one of those nice looking [metal squeezers](https://www.amazon.com/s?k=lemon+metal+squeezer)? Looking at you Rodrigo.

You can take this further, and do something like the [Template method pattern](https://en.wikipedia.org/wiki/Template_method_pattern):

```elixir
def prepare_beverage(beverage_type) do
  beverage_impl = beverage_for(beverage_type)

  with :ok <- roll_up_sleeves(),
       {:ok, quantity} <- random_quantity(),
       {:ok, preparation} <- beverage_impl.prepare_it(quantity),
       {:ok, beverage_with_side} <- beverage_impl.add_side(preparation),
       {:ok, _beverage} <- serve_it(beverage_with_side) do
    {:ok, "happy days!"}
  else
    error -> {:error, error}
  end
end
```

In this case, the template defines two very general actions: randomising the quantity used to prepare your beverage (`random_quantity/0`) and serving the drink (`serve_it/1`). Actually preparing it (`prepare_it/1`): beans for coffee, leaves for tea, etc., and getting a special side for each of these (`add_side/1`): chocolate brownie for coffee, butter cookie for tea, etc. is different for each, so each specific implementation should do its own thing.

Functional purists may be crying right now, so I'll stop. But you get the gist of it. This new design seems to, for now, have put us in a much better place. Leveraging language features such as [Protocols](https://elixir-lang.org/getting-started/protocols.html) and [Behaviours](https://elixir-lang.org/getting-started/typespecs-and-behaviours.html#behaviours) has truly helped us maintain and improve our code for the long run.

Code available [here](https://github.com/dnlserrano/beverages).

_Note: Thanks to Dino Costa for proposing the usage of a "factory" function (e.g., `beverage_for/1`). Also, thanks to him, Daniel Caixinha, and Pedro Madeira for validating this design._

Merry Xmas! 🎄🎅
