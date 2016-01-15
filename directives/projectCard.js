'use strict';

angular
  .module('app')
  .directive('projectCard', projectCard);

  function projectCard() {
    return {
      restrict: "AE",
      templateUrl: "directives/projectCard.html",
      scope: {
        info: "@"
      },
      controller: function($scope) {
        'use strict';
        $scope.project = JSON.parse($scope.info);
      }
    };
  };
