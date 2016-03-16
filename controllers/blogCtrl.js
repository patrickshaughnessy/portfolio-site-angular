'use strict';

angular
  .module('app')
  .controller('blogCtrl', function($timeout, $scope, $location, $anchorScroll){
    $scope.posts = posts;

    $timeout(function(){
      $scope.loaded = true;
    }, 1500)

    $scope.getSnippet = function(post){
      var snippet = post.body.split(' ').slice(0, 40).join(' ');
      var link = `<a href="#/blog#${post.id}"> ... read more</a>`
      return snippet + link;
    }

    $scope.goToPost = function(id) {
       $location.hash(id);
       $anchorScroll();
    }

  });
