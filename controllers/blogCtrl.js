'use strict';

angular
  .module('app')
  .controller('blogCtrl', function($timeout, $scope, $location, $anchorScroll){
    $scope.posts = posts.reverse();

    $timeout(function(){
      $scope.loaded = true;
    }, 1500)



    $scope.goToPost = function(id) {
       $location.hash(id);
       $anchorScroll();
    }

  });
