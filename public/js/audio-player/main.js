/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './audio-player-ctrl',
  './audio-player-queue-ctrl',
  './audio-player-srv',
  './sound-manager-srv',
  './sound-srv'
], function (angular,
             AudioPlayerCtrl,
             AudioPlayerQueueCtrl,
             AudioPlayerSrv,
             SoundManagerSrv,
             SoundSrv) {
  'use strict';
  
  var module = angular.module('soundrocket.audio-player', [
    'soundrocket.models'
  ]);
  
  module.controller('AudioPlayerCtrl', AudioPlayerCtrl)
        .controller('AudioPlayerQueueCtrl', AudioPlayerQueueCtrl)
        .service('audioPlayerSrv', AudioPlayerSrv)
        .service('soundManagerSrv', SoundManagerSrv)
        .service('soundSrv', SoundSrv);
  
  return module;
});
