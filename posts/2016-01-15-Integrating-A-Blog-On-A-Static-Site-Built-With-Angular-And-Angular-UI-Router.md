---
title: 'Integrating A Blog On A Static Site Built With Angular And Angular UI Router'
id: 'Integrating_A_Blog_On_A_Static_Site_Built_With_Angular_And_Angular UI_Router'
date: '01-15-2016'
tags: ['blog', 'Angular', 'Javascript']
---

There are a ton of open source blog generators for devs out there: Ghost, Hexo, Jekyll, Wintersmith, Metalsmith ([this post](http://sixrevisions.com/tools/open-source-blogging-platforms-for-developers/ "Open Source Blogging Platforms For Developers") has a nice write-up on a few). But when I set out to make my personal site, I ran into a glaring problem with all of them.

The goal was to make a little portfolio site - a landing page, a page to showcase and link to my work, and an integrated blog. Pretty simple, right? I thought so too, until I started playing around with these tools. After much frustration and tinkering, I realized that none of them had a simple, out-of-the-box solution to create different pages or views. Apparently, you can either have a blog or a site, but you can't have both.

Well, that just wasn't going to work for me =).

### If It Doesn't Exist, Make It

I knew what I needed to do, so it was just a matter of putting the pieces together correctly in order to make it work. Initially, I tried messing around with [Hexo](https://hexo.io/ "Hexo"). But even after diving into the config settings, I couldn't find a way to generate even a simple home page without the blog.

Then I thought [metalsmith](http://www.metalsmith.io/ "metalsmith") was going to work out. You basically make a build file that compiles all your files into a nice little static package. Unfortunately, the learning curve was a bit too steep on this one and I could never quite get past the most basic of basic tutorials (although [this tutorial by Rob Ribeiro](https://azurelogic.com/posts/building-a-blog-with-metalsmith/ "Building a blog with Metalsmith") was super helpful and at least got me started).

By this point, I realized I needed to do one of two things. Either find a way to:

1. Generate my views with one of these blog generators, *OR*
2. Compile the markdown to HTML and inject it into my site before deploying.

I was out of ideas on option 1, so it was on to option 2.

### The Setup

You can find all the code for this on [my github repo](https://github.com/patrickshaughnessy/Example-Portfolio-Site-With-Blog "my github repo"). Feel free to clone it down and follow along or use it as a template.

Basically I started with a pretty simple setup - just angular and angular-ui-router to handle my views and bootstrap for styling. Theres a 'posts' folder with a few markdown files, but they're not showing up in our blog just yet.

What we need to do is take those markdown files, preserve the front matter as data, render the body to HTML, and make it available to our angular app. In other words, we need a build script. In your terminal:

    touch build.js

### Node Time!

We'll need a few dependencies to make our build script run properly, so let's add those now. Do an

    npm init

and follow the prompts to initialize a package.json file in your directory. For this project, we'll need to parse our markdown and concat some files together, so:

    npm i -S concat-files markdown-parse

Ok now we're ready to make our build script!

### The Build

Let's start out by requiring our dependencies. In your build.js:

    'use strict';

    var concat = require('concat-files');
    var parser = require('markdown-parse');
    var fs = require('fs');
    var path = require('path');

Great! Now the first thing we want to do is grab all those markdown files from our posts directory so they're available to the parser. Then we'll want to iterate over each one, creating a new post object that we can use in our angular app later.

    fs.readdir('./posts/', function(err, files){
        if (err) throw err;
        var posts = [];
        files.forEach(function(file){
            var content = (fs.readFileSync(__dirname + `/posts/${file}`, 'utf8'));

        parser(content, function(err, result){
            var newPost = {};
            newPost.title = result.attributes.title;
            newPost.id = result.attributes.id;
            newPost.date = result.attributes.date;
            newPost.tags = result.attributes.tags || [];
            newPost.body = result.html.toString();

            posts.push(newPost);
        })
    });

It's worth noting here that this gives you complete control over the data you make available to your blog component. Here I've only included things like the title, date, and tags. But you could easily expand this to include just about any meta data you want.

Next, we'll write a temporary file to hold the posts data. We can assign it to a variable 'data' to make it available to our angular app later.

    var data = `var posts = ${JSON.stringify(posts)}`
    fs.writeFileSync('./posts.js', data);

And finally, let's combine our blog component controller with our newly minted post data. We should also remove that temporary posts file to keep our directory nice and clean.

    concat([
        './controllers/blogCtrl.js',
        './posts.js'
    ], path.resolve(__dirname, './controllers/blogCtrlCompiled.js'), function(err){
        if (err) throw err
        console.log('All posts compiled successfully!');
        fs.unlinkSync('./posts.js')
    });

Now we can run our build.js file in node, and it will create a new file called blogCtrlCompiled.js in our controllers directory. If you take a peek inside that compiled controller file you'll see that our data has been added to the bottom and is now accessible to the controller.

### Setting Up The Blog Component

With the tricky part of injecting our posts into the app finished, we can move on to getting the blog set up and styled to our liking. I find a custom directive helpful in this situation. We can set it up once, and then just ng-repeat over each post and populate them automatically.

So in our templates/blog.html, let's change the 'posts go here' to:

    <div class="col-xs-12" ng-repeat="post in posts">
        <blog-post info={{post}}></blog-post>
    </div>

And create a blogPost directive - blogPost.js

    'use strict';

    angular.module('app').directive('blogPost', blogPost);

    function blogPost() {
        return {
            restrict: "AE",
            templateUrl: "directives/blogPost.html",
            scope: {
                info: "@"
            },
            controller: function($scope) {
                'use strict';
                $scope.post = JSON.parse($scope.info);
            }
        };
    };

and our template html - blogPost.html

    <h1 class="postTitle" id={{post.id}}>{{post.title}}</h1>
    <h6 class="postDate">{{post.date}}</h6>
    <div ng-bind-html="post.body"></div>

Note that ng-bind-html requires the angular $sanitize service to be available to your app. You'll need to add the cdn link in a script to your index.html and inject it in the app.js file as well. Of course, don't forget to link up your new directive in your index.html too.

And that's about it! Just run build.js before serving it up on localhost or deploying to gh-pages or wherever.

### Final Thoughts

At first I was overwhelmed at the thought of making my own blog component. Plenty of people who've been doing this longer than I have made all these cool blog generating tools - it's probably really hard. And it was totally frustrating at first digging through the config files on each of them, trying to figure out how they worked. But a little persistence goes a long way, and I'm super satisfied with the way it turned out. Now I've got a fully integrated blog on a single-page static site, and I can customize it however I want without worrying about messing up some 'magic' buried in some node module somewhere in the npm package.

What do you think? Any ideas on how I can improve this thing or did you do it a different way? Let me know!
