'use strict';

angular
  .module('app')
  .directive('projectCard', projectCard);

  function projectCard() {
    return {
      restrict: "AE",
      templateUrl: "directives/projectCard.html",
      scope: {
        info: "@",
        index: "@"
      },
      controller: function($scope, $timeout) {
        'use strict';
        $scope.project = JSON.parse($scope.info);
        var num = (++$scope.index)*250;
        $timeout(function(){
          $scope.animate = true;
        }, num);
      }
    };
  };
