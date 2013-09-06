/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'audio-player',
  './track-ctrl',
  './track-drt'
], function (angular,
             audioPlayerModule,
             TrackCtrl,
             trackDrtFactory) {
  'use strict';
  
  var module = angular.module('soundrocket.track', [
    audioPlayerModule.name
  ]);
  
  module.controller('TrackCtrl', TrackCtrl)
        .directive('srTrack', trackDrtFactory);
  
  return module;
});
