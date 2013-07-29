/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'app'
], function (app) {
  'use strict';

  app.config([
    '$locationProvider',
    '$routeProvider',
    function ($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider.when('/', { templateUrl: 'partials/root.html', controller: 'RootCtrl' })
                    .when('/search', { templateUrl: 'search.html', controller: 'SearchCtrl' })
                    .when('/songs/:id', { templateUrl: 'songs.html', controller: 'SongsCtrl' })
                    .when('/playlist/:name', { templateUrl: 'playlist.html', controller: 'PlaylistCtrl' })
                    .otherwise({ redirectTo: '/' });
    }
  ]);

  app.run([ '$rootScope', '$location', 'userMdl', function ($rootScope, $location, userMdl) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next.$$route.controller === 'RootCtrl' && userMdl.isAuthenticated()) {
        $location.path('/songs/loved');
      }
    });
  }]);
});
