/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'user',
  'audio-player',
  'angular-route'
], function (angular, userModule, audioPlayerModule) {
  'use strict';

  var routes = angular.module('soundrocket.routes', [
    'ngRoute',
    userModule.name,
    audioPlayerModule.name
  ]);

  routes.config([
    '$locationProvider',
    '$routeProvider',
    function ($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: 'templates/home/home.html',
          controller: 'HomeCtrl',
          pageTitle: 'Welcome',
          authenticated: false
        })
        .when('/settings/:id', {
          templateUrl: 'templates/settings/settings.html',
          controller: 'SettingsCtrl',
          pageTitle: 'Settings',
          authenticated: true
        })
        .when('/search', {
          templateUrl: 'templates/track-search/track-search-results.html',
          controller: 'TrackSearchResultsCtrl',
          pageTitle: 'Search',
          authenticated: true
        })
        .when('/track/:artist/:track', {
          templateUrl: 'templates/track-info/track-info.html',
          controller: 'TrackInfoCtrl',
          pageTitle: 'About Track',
          authenticated: true
        })
        .when('/:user', {
          templateUrl: 'templates/songs-group.html',
          controller: 'SongsGroupCtrl',
          pageTitle: 'Home',
          authenticated: true
        })
        .when('/:user/tracks/:group', {
          templateUrl: 'templates/songs-group.html',
          controller: 'SongsGroupCtrl',
          pageTitle: 'Songs',
          authenticated: true
        })
        .when('/:user/playlist/:name', {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl',
          pageTitle: 'Playlist',
          authenticated: true
        })
        .otherwise({ redirectTo: '/' });
    }
  ]);

  routes.run([
    '$rootScope',
    '$window',
    '$location',
    'userSrv',
    'audioPlayerSrv',
    function ($rootScope, $window, $location, userSrv, audioPlayerSrv) {
      function setPageTitle (title) {
        var currentTitle   = $window.document.title,
            prefixEndIndex = currentTitle.indexOf('-'),
            prefixValue    = currentTitle.substring(0, prefixEndIndex + 1);

        $window.document.title = prefixValue + ' ' + title;
      }

      // authentication rules
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var isLoggedIn = userSrv.isLoggedIn();
        
        if (isLoggedIn && $location.path() === '/') {
          $location.path('/' + userSrv.getName());
        }
      });
      
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var isLoggedIn    = userSrv.isLoggedIn(),
            hasInvitation = userSrv.hasInvitation();

        if (!isLoggedIn && next.$$route.authenticated) {
          return $location.path('/');
        }

        if (isLoggedIn && !hasInvitation) {
          return $location.path('/settings/account');
        }

        if (next.$$route.controller === 'HomeCtrl') {
          audioPlayerSrv.stop();
        }
      });

      // page title update
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (userSrv.isLoggedIn()) {
          userSrv.get().then(function (user) {
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
