/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'angular-cookies',
  'components/song',
  'components/song-progress',
  'components/user-profile',
  'components/user-profile-menu',
  'controllers',
  'services',
  'filters',
  'directives',
  'models'
], function (angular) {
  'use strict';

  var soundRocket = angular.module('soundrocket', [
    'ngCookies',
    'soundrocket.components.song',
    'soundrocket.components.song-progress',
    'soundrocket.components.user-profile',
    'soundrocket.components.user-profile-menu',
    'soundrocket.controllers',
    'soundrocket.services',
    'soundrocket.filters',
    'soundrocket.directives',
    'soundrocket.models'
  ]);

  soundRocket.constant('config', { debug: false });

  soundRocket.config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.defaults.headers.common.Accept = 'application/json';

      $httpProvider.interceptors.push([
        '$q',
        '$location',
        function ($q, $location) {
          return {
            responseError: function (rejection) {
              if (rejection.status === 401) {
                $location.path('/');
              }

              return $q.reject(rejection);
            }
          };
        }
      ]);
    }
  ]);

  return soundRocket;
});
