'use strict';

angular
  .module('app')
  .controller('portfolioCtrl', function($scope, $timeout){

    // $timeout(function(){
    //   $scope.loaded = true;
    // }, 1000)

    $scope.projects = [
      {
        title: 'Friend Finder',
        image: 'assets/friendFinder2.png',
        link: 'http://young-favorite-users.herokuapp.com/',
        github: 'https://github.com/babelthuap/favorite-users',
        description: 'A full MEAN stack app that lets you connect with friends. We also set up an admin page for managing users. Learned a whole lot about git while collaborating on this project!'
      },
      {
        title: 'Chive Smash',
        image: 'assets/chive-smash.png',
        link: 'https://chive-smash.herokuapp.com/',
        github: 'https://github.com/patrickshaughnessy/Chive-Scraper-Angular',
        description: 'Inspired by Facesmash. A little chive scraper built with cheerio, angular, and firebase'
      },
      {
        title: 'Weather App',
        image: 'assets/weatherApp.png',
        link: 'http://patrickshaughnessy.github.io/Weather-App/',
        github: 'https://github.com/patrickshaughnessy/Weather-App',
        description: 'A weather app using jquery and the weather underground api.'
      },
      {
        title: 'Towers Of Hanoi',
        image: 'assets/towersOfHanoi.png',
        link: 'http://patrickshaughnessy.github.io/Towers-of-Hanoi/',
        github: 'https://github.com/patrickshaughnessy/Towers-of-Hanoi',
        description: 'The classic towers of hanoi game built with jQuery'
      }
    ]
  })
