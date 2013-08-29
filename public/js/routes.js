/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'angular-route'
], function (angular) {
  'use strict';

  var routes = angular.module('soundrocket.routes', [
    'ngRoute'
  ]);

  routes.config([
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
          templateUrl: 'partials/search.html',
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
        .when('/settings/:id', {
          templateUrl: 'partials/settings.html',
          controller: 'SettingsCtrl',
          pageTitle: 'Settings',
          authenticated: true
        })
        .when('/track/:artist/:track', {
          templateUrl: 'partials/track.html',
          controller: 'TrackCtrl',
          pageTitle: 'About Track',
          authenticated: true
        })
        .otherwise({ redirectTo: '/' });
    }
  ]);

  routes.run([
    '$rootScope',
    '$window',
    '$location',
    'userMdl',
    'audioPlayerSrv',
    function ($rootScope, $window, $location, userMdl, audioPlayerSrv) {
      function setPageTitle (title) {
        var currentTitle   = $window.document.title,
            prefixEndIndex = currentTitle.indexOf('-'),
            prefixValue    = currentTitle.substring(0, prefixEndIndex + 1);

        $window.document.title = prefixValue + ' ' + title;
      }

      // authentication rules
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var isLoggedIn    = userMdl.isLoggedIn(),
            hasInvitation = userMdl.hasInvitation();

        if (!isLoggedIn && next.$$route.authenticated) {
          return $location.path('/');
        }

        if (isLoggedIn) {
          if (!hasInvitation) {
            return $location.path('/settings/account');
          }

          if (next.$$route.controller === 'RootCtrl') {
            return $location.path('/songs/loved');
          }
        }

        if (next.$$route.controller === 'RootCtrl') {
          audioPlayerSrv.stop();
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
  
  return routes;
});
