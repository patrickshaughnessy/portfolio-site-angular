'use strict';

angular
  .module('app', ['ui.router', 'ngAnimate'])
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
      })
      .state('about', {
        url: "/about",
        templateUrl: "templates/about.html",
        controller: 'aboutCtrl'
      });
    //
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
