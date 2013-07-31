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

      $routeProvider
        .when('/', {
          templateUrl: 'partials/root.html',
          controller: 'RootCtrl',
          pageTitle: 'Welcome',
          authenticated: false
        })
        .when('/search', {
          templateUrl: 'search.html',
          controller: 'SearchCtrl',
          pageTitle: 'Search',
          authenticated: true
        })
        .when('/songs/:id', {
          templateUrl: 'partials/songs-group.html',
          controller: 'SongsGroupCtrl',
          pageTitle: 'Songs',
          authenticated: true
        })
        .when('/playlist/:name', {
          templateUrl: 'partials/playlist.html',
          controller: 'PlaylistCtrl',
          pageTitle: 'Playlist',
          authenticated: true
        })
        .otherwise({ redirectTo: '/' });
    }
  ]);

  app.run([
    '$rootScope',
    '$window',
    '$location',
    'userMdl',
    function ($rootScope, $window, $location, userMdl) {
      function setPageTitle (title) {
        var currentTitle   = $window.document.title,
            prefixEndIndex = currentTitle.indexOf('-'),
            prefixValue    = currentTitle.substring(0, prefixEndIndex + 1);

        $window.document.title = prefixValue + ' ' + title;
      }

      // authentication rules
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var isLoggedIn = userMdl.isLoggedIn();

        if (next.$$route.controller === 'RootCtrl' && isLoggedIn) {
          $location.path('/songs/loved');
          return;
        }

        if (next.$$route.authenticated && !isLoggedIn) {
          $location.path('/');
        }
      });

      // page title update
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (userMdl.isLoggedIn()) {
          userMdl.get().then(function (user) {
            setPageTitle(user.name + ' - ' + current.$$route.pageTitle);
          });
        } else {
          setPageTitle(current.$$route.pageTitle);
        }
      });
    }
  ]);
});
