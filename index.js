'use strict';

angular.module('app', ['ngMaterial'])
.config(function($mdThemingProvider){
  $mdThemingProvider.definePalette('myPrimary', {
    '50': '#eaeef6',
    '100': '#d8e0ef',
    '200': '#c7d2e7',
    '300': '#b5c4df',
    '400': '#a3b5d8',
    '500': '#91A7D0',
    '600': '#7f99c8',
    '700': '#6d8ac1',
    '800': '#5b7cb9',
    '900': '#4b6eb0',
    'A100': '#fcfdfe',
    'A200': '#ffffff',
    'A400': '#ffffff',
    'A700': '#44639e'
  });
  $mdThemingProvider.definePalette('myAccent', {
    '50': '#61a693',
    '100': '#72af9e',
    '200': '#82b8a9',
    '300': '#92c1b5',
    '400': '#a2cbc0',
    '500': '#b3d4cb',
    '600': '#d3e6e1',
    '700': '#e4efec',
    '800': '#f4f9f7',
    '900': '#ffffff',
    'A100': '#d3e6e1',
    'A200': '#C3DDD6',
    'A400': '#b3d4cb',
    'A700': '#ffffff'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('myPrimary')
    .accentPalette('myAccent');
})
