/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  // common
  'common',
  // features
  'audio-player',
  'home',
  'keyboard-shortcuts',
  'settings',
  'similar-tracks',
  'track',
  'track-info',
  'track-search',
  'user',
  // TODO
  'components/playlist-chooser',
  'components/song-progress',
  'components/songs-actions',
  'controllers',
  'models'
], function (angular, commonModule, audioPlayerModule, homeModule,
             keyboardShortcutsModule, settingsModule, similarTracksModule,
             trackModule, trackInfoModule, trackSearchModule, userModule) {
  'use strict';

  var soundRocket = angular.module('soundrocket', [
    // common
    commonModule.name,
    // features
    audioPlayerModule.name,
    homeModule.name,
    keyboardShortcutsModule.name,
    settingsModule.name,
    similarTracksModule.name,
    trackModule.name,
    trackInfoModule.name,
    trackSearchModule.name,
    userModule.name,
    // FIX: must be implemented as features
    'soundrocket.components.playlist-chooser',
    'soundrocket.components.song-progress',
    'soundrocket.components.songs-actions',
    'soundrocket.controllers',
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
