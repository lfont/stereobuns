/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'track-group',
  './audio-player-ctrl',
  './audio-player-queue-ctrl',
  './audio-player-srv',
  './sound-manager-srv',
  './sound-srv'
], function (angular,
             trackGroupModule,
             AudioPlayerCtrl,
             AudioPlayerQueueCtrl,
             AudioPlayerSrv,
             SoundManagerSrv,
             SoundSrv) {
  'use strict';
  
  var module = angular.module('soundrocket.audio-player', [
    trackGroupModule.name
  ]);
  
  module.controller('AudioPlayerCtrl', AudioPlayerCtrl)
        .controller('AudioPlayerQueueCtrl', AudioPlayerQueueCtrl)
        .service('audioPlayerSrv', AudioPlayerSrv)
        .service('soundManagerSrv', SoundManagerSrv)
        .service('soundSrv', SoundSrv);
  
  return module;
});
