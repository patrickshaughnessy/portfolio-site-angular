'use strict';

angular
  .module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "templates/home.html",
        controller: 'homeCtrl'
      })
      .state('portfolio', {
        url: "/portfolio",
        templateUrl: "templates/portfolio.html",
        controller: 'portfolioCtrl'
      });

    // $locationProvide.hashPrefix('!');
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

  })
  .controller('appCtrl', function($scope, $location){

    $scope.isActive = function(url){
      return url === $location.path();
    }
  })
