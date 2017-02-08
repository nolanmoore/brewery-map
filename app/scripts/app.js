'use strict';

/**
 * @ngdoc overview
 * @name breweryMapApp
 * @description
 * # breweryMapApp
 *
 * Main module of the application.
 */
angular
  .module('breweryMapApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-leaflet'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activeTab: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl as about',
        activeTab: 'about'
      })
      .when('/brew-map', {
        templateUrl: 'views/brew-map.html',
        controller: 'BrewMapCtrl as brewMap',
        activeTab: 'brewMap'
      })
      .when('/leaflet-test', {
        templateUrl: 'views/leaflet-test.html',
        controller: 'LeafletTestCtrl as leaf'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope) {
    $rootScope.debug = true;
  });
