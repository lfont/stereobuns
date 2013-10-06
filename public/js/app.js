/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  // features
  'common',
  'artist-info',
  'audio-player',
  'home',
  'keyboard-shortcuts',
  'layout',
  'settings',
  'track',
  'track-info',
  'track-group',
  'track-search',
  'user',
  'playlist',
  // TODO
  'components/playlist-chooser',
  'components/songs-actions'
], function (angular, commonModule, artistInfoModule, audioPlayerModule,
             homeModule, keyboardShortcutsModule, layoutModule,
             settingsModule, trackModule, trackInfoModule,
             trackGroupModule, trackSearchModule, userModule,
             playlistModule) {
  'use strict';

  var soundRocket = angular.module('soundrocket', [
    // features
    commonModule.name,
    artistInfoModule.name,
    audioPlayerModule.name,
    homeModule.name,
    keyboardShortcutsModule.name,
    layoutModule.name,
    settingsModule.name,
    trackModule.name,
    trackInfoModule.name,
    trackGroupModule.name,
    trackSearchModule.name,
    userModule.name,
    playlistModule.name,
    // FIX: must be implemented as features
    'soundrocket.components.playlist-chooser',
    'soundrocket.components.songs-actions'
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
