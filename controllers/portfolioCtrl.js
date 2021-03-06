'use strict';

angular
  .module('app')
  .controller('portfolioCtrl', function($scope, $timeout){

    // $timeout(function(){
    //   $scope.loaded = true;
    // }, 1000)

    $scope.projects = [
      {
        title: 'Get It, Got It',
        image: 'assets/getitgotit.png',
        link: 'https://getitgotit.firebaseapp.com/',
        github: 'https://github.com/patrickshaughnessy/GetIt-GotIt',
        description: 'Redefining the interactive classroom. A tool for teachers to monitor their classroom, and for students to get the help they need in real time.'
      },
      {
        title: 'Friend Finder',
        image: 'assets/friendFinder2.png',
        link: 'http://young-favorite-users.herokuapp.com/',
        github: 'https://github.com/babelthuap/favorite-users',
        description: 'A full MEAN stack app that lets you connect with friends. We also set up an admin page for managing users. Learned a whole lot about git while collaborating on this project!'
      },
      {
        title: 'Pokéapi GraphQL Interface',
        image: 'assets/pokeapi-graphiql2.png',
        link: 'https://pokeapi-graphiql.herokuapp.com/',
        github: 'https://github.com/patrickshaughnessy/PokeAPI-GraphQL',
        description: 'A GraphQL, relay-compatible interface for the RESTful Pokéapi.'
      },
      {
        title: 'Chive Smash',
        image: 'assets/chive-smash2.png',
        link: 'https://chive-smash.herokuapp.com/',
        github: 'https://github.com/patrickshaughnessy/Chive-Scraper-Angular',
        description: 'Inspired by Facesmash. A little chive scraper built with cheerio, angular, and firebase'
      },
      {
        title: 'Apocalyse.then()',
        image: 'assets/apocalypse-then.png',
        link: 'https://protected-spire-4855.herokuapp.com/',
        github: 'https://github.com/babelthuap/apocalypse.then',
        description: 'A zombie apocalypse survival game. How long can you survive??'
      },
    ]
  })
