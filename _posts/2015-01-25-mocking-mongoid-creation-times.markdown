---
layout:     post
title:      "Mocking Mongoid Creation Times"
subtitle:   "because sometimes you just have to"
date:       2015-01-25 15:54:00
author:     "Daniel Serrano"
header-img: "img/mocking-mongoid-creation-times/cover.png"
header-img-author-name: Liam Major
header-img-author-url: "https://www.flickr.com/photos/95478778@N05/"
---

It's about 11:00 in the morning and after pondering on what I discussed the day before with [@tjsousa](https://twitter.com/tjsousa), I decide to go for the most general option. That means I will have to implement two new filtering parameters for the resource at hand (let's assume filtering posts). The filtering parameters are `time_start` and `time_end`, such that I can do something like:

```
GET https://my.endpoint.com/posts?time_start=1422057600&time_end=1422144000
```

Here I am using an integer corresponding to Unix time. The request would translate to getting every post created between `2015-01-24 00:00:00 +0000` and `2015-01-25 00:00:00 +0000` (I will omit pagination and other hairy details for the sake of simplicity).

The first thing I remember when implementing this feature is Rails ActiveRecord and its [`#timestamps`](http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/TableDefinition.html#method-i-timestamps) method when creating migrations, which adds two convenient columns to the table for the objects of that model, `created_at` and `updated_at`. But here we are using Mongoid and therefore that would translate to including the module `Mongoid::Timestamps` in the `Post` model. This would of course be "sort of backwards incompatible" since if I was to rely on these fields, I would not be able to filter already existing posts, only new ones which would have these two new fields.

Gladly enough, MongoDB's `ObjectId` contains enough information such that we are able to infer the creation time of a given object. This information [is hidden in the first 4 bytes of the `ObjectId`](http://docs.mongodb.org/manual/reference/object-id/). So, in order to check if the creation time was before or after a given timestamp, we check those bytes. Mongoid even has an easy way of doing this, by means of the `#generation_time` method in `Moped::BSON::ObjectId`:

{% highlight ruby %}
> Post.first.id.generation_time
=> 2015-01-18 15:04:57 UTC
{% endhighlight %}

Now I have a mental idea of how I'm going to tackle this problem. I just have to start writing acceptance specs, move to the implementation of just enough code to enter the unit specs and somewhere in the middle I will also have to do some integration testing since this will be heavily dependent on assumptions I am making about the database (mainly regarding what will be retrieved from it).

# Now to the weirdness...

While implementing this feature, I wrote specs for the [repository abstraction](http://martinfowler.com/eaaCatalog/repository.html) for the posts. Imagine a class `MongoidPostsRepository` which wraps some common Mongoid functionality (e.g., `#where` and `#find`) as well as more specific methods like `#list_time` which would in this case take `time_start` and `time_end` as arguments.

I write something like the following:

{% highlight ruby %}
describe '#list_time' do
  let(:first_post)  { Support.new_post('01-01-2015 13:01:00 +0000') }
  let(:second_post) { Support.new_post('01-01-2015 13:02:00 +0000') }
  let(:third_post)  { Support.new_post('01-01-2015 13:03:00 +0000') }
  let(:fourth_post) { Support.new_post('01-01-2015 13:03:00 +0000') }

  before do
    [first_post, second_post, third_post, fourth_post].each do |post|
      repository.create(post)
    end
  end

  context 'when limiting start time' do
    let(:time_start) { Time.parse('01-01-2015 13:02:00 +0000').to_i }

    it 'filters posts in the repository which were created in or after the specified time' do
      result = repository.list_time(time_start, nil)
      result.should_not be_nil
      result.length.should eq 3
      result.should include second_post
      result.should include third_post
      result.should include fourth_post
      result.should_not include first_post
    end
  end
end
{% endhighlight %}

But when I run it... it fails.

{% highlight ruby %}
Failure/Error: result.length.should eq 3
expected: 3
     got: 2
{% endhighlight %}

It's ok. Let's check the implementation once again. Could it be that... no, everything fine here. What about that detail... no. No luck there either.

> This is weird.

So I go ahead and do what I usually do. I use [`pry`](/2015/01/11/debugging-ruby/).

{% highlight ruby %}
it 'filters posts in the repository which were created in or after the specified time' do
  result = repository.list_time(time_start, nil)
  result.should_not be_nil
  require 'pry'; binding.pry # it will stop here so that I can look inside result
  result.length.should eq 3
  result.should include second_post
  result.should include third_post
  result.should include fourth_post
  result.should_not include first_post
end
{% endhighlight %}

When `pry` stops I choose to check for the value of the generation times of each object. Since `result` is an instance of `Mongoid::Criteria`, I have to call `#to_a` on it.

{% highlight ruby %}
> result.to_a.map { |p| puts p.id.generation_time }
2015-01-01 13:02:00 UTC
2015-01-01 13:03:00 UTC
=> [nil, nil]
{% endhighlight %}

Hmm... Why did I only get one of those posts created at 13:03?

I now look at the `ObjectId`s of each one of the stored objects.

{% highlight ruby %}
> first_post.id
=> "54a5450c0000000000000000"
> second_post.id
=> "54a545480000000000000000"
> third_post.id
=> "54a545840000000000000000"
> fourth_post.id
=> "54a545840000000000000000"
{% endhighlight %}

We have two posts with the same ID. Hmm... That would explain the fact that `Mongoid::Criteria` is including only one of them, right? In fact, this happened:

{% highlight ruby %}
> third_post == fourth_post
=> true
{% endhighlight %}

Yep. As far as Mongoid is concerned, if the objects have the same ID (even though they have different values for the `body` or `author` field), they're the same. And it does make sense that this happens. I mean, I can understand that the implementation won't allow more than one object of the same model to have the same `ObjectId`. But why is it happening? Why do I have two objects with the same ID?

The important part in my spec is the call to the `.new_post` method in the `Support` class when I am declaring the different posts with `let`. In order to mock a Mongoid creation time, I have used another useful Mongoid method. This time, instead of retrieving a timestamp from an ID, I was interested in generating an artificial ID for a given timestamp. For that, I used method `.from_time` in the `Moped::BSON::ObjectId` class. It works like the following:

{% highlight ruby %}
> id = Moped::BSON::ObjectId.from_time(Time.parse('01-01-2015 13:03:11 +0000'))
=> "54a5458f0000000000000000"
> id.generation_time
=> 2015-01-01 13:03:11 UTC
{% endhighlight %}

Yes, it does the job. At a glance. What is does not guarantee is that two equal timestamps will generate different `ObjectId`s and that's what bit me here. I was expecting that the IDs would be different, but they turned out to be the same. As you can see from the previous snippet of code, only the first 8 characters (which encode the first 4 bytes of the `ObjectId`) are replaced with relevant information. The remaining 8 bytes are zeroed.

I could have simply changed the spec and make it so that all timestamps are different for the sake of this test (which in fact I did later on). But I needed to understand why this was happening (i.e., I also needed a new blog post).

This annoying little issue led me to create my first gem. I called it [`mongoid-bigbang`](https://github.com/dnlserrano/mongoid-bigbang). It is pretty simple (it was more of an excuse to understand how the [RubyGems](https://rubygems.org/) ecossystem works). What it does is... yeah, you guessed it. It creates different `ObjectId`s leveraging the remaining 8 bytes to create additional entropy, thus respecting the timestamp needed for the mocking but adding some extra fuss. It also keeps a record of the additional fuss already used in order to prevent ID clashes.

That's it for today. If you find it useful, give the [gem](https://rubygems.org/gems/mongoid-bigbang) a try.

Don't be shy, comment away! I'll be glad to answer any questions or suggestions you might have.