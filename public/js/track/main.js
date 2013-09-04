/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './track-ctrl',
  './track-drt'
], function (angular,
             TrackCtrl,
             trackDrtFactory) {
  'use strict';
  
  var module = angular.module('soundrocket.track', [
    'soundrocket.audio-player'
  ]);
  
  module.controller('TrackCtrl', TrackCtrl)
        .directive('srTrack', trackDrtFactory);
  
  return module;
});
