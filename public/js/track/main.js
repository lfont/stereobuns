/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'audio-player',
  './track-ctrl',
  './progress/track-progress-ctrl',
  './track-drt',
  './progress/track-progress-drt'
], function (angular,
             audioPlayerModule,
             TrackCtrl,
             TrackProgressCtrl,
             trackDrtFactory,
             trackProgressDrtFactory) {
  'use strict';
  
  var module = angular.module('soundrocket.track', [
    audioPlayerModule.name
  ]);
  
  module.controller('TrackCtrl', TrackCtrl)
        .controller('TrackProgressCtrl', TrackProgressCtrl)
        .directive('srTrack', trackDrtFactory)
        .directive('srTrackProgress', trackProgressDrtFactory);
  
  return module;
});
