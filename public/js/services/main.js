/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './artwork-srv',
  './sound-search-srv',
  './sound-srv',
  './sound-manager-srv',
  './audio-player-srv'
], function (angular,
             ArtworkSrv,
             SoundSearchSrv,
             SoundSrv, SoundManagerSrv, AudioPlayerSrv) {
  'use strict';

  return angular.module('soundrocket.services', [])
                .service('artworkSrv', ArtworkSrv)
                .service('soundSearchSrv', SoundSearchSrv)
                .service('soundSrv', SoundSrv)
                .service('soundManagerSrv', SoundManagerSrv)
                .service('audioPlayerSrv', AudioPlayerSrv);
});
