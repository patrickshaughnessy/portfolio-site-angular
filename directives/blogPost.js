'use strict';

angular
  .module('app')
  .directive('blogPost', blogPost);

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
