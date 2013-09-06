/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'angular-cookies',
  // TODO
  'components/playlist-chooser',
  'components/song-progress',
  'components/songs-actions',
  'controllers',
  'models',
  // common
  'common',
  // features
  'audio-player',
  'home',
  'keyboard-shortcuts',
  'similar-tracks',
  'track',
  'track-info',
  'track-search'
], function (angular) {
  'use strict';

  var soundRocket = angular.module('soundrocket', [
    'ngCookies',
    // TODO
    'soundrocket.components.playlist-chooser',
    'soundrocket.components.song-progress',
    'soundrocket.components.songs-actions',
    'soundrocket.controllers',
    'soundrocket.models',
    // common
    'soundrocket.common',
    // features
    'soundrocket.audio-player',
    'soundrocket.home',
    'soundrocket.keyboard-shortcuts',
    'soundrocket.similar-tracks',
    'soundrocket.track',
    'soundrocket.track-info',
    'soundrocket.track-search'
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
  
  soundRocket.run([
    '$rootScope',
    function ($rootScope) {
      $rootScope.utils = {
        copy: function (obj) {
          var copy = angular.copy(obj);
          delete copy._id;
          return copy;
        },
        
        indexOf: function (objs, key, value) {
          var index = -1,
              i, len;
          for (i = 0, len = objs.length; i < len; i++) {
            if (objs[i][key] === value) {
              index = i;
              break;
            }
          }
          return index;
        }
      };
    }
  ]);

  return soundRocket;
});
