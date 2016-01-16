'use strict';

angular
  .module('app')
  .controller('blogCtrl', function($scope, $location, $anchorScroll){
    $scope.posts = posts;

    $scope.goToPost = function(id) {
       $location.hash(id);
       $anchorScroll();
    }
    
  });
