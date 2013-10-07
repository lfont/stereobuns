/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'audio-player',
  'track-group',
  './track-actions-ctrl',
  './track-actions-drt'
], function (angular,
             audioPlayerModule,
             trackGroupModule,
             TrackActionsCtrl,
             trackActionsDrtFactory) {
  'use strict';
  
  var module = angular.module('soundrocket.track-actions', [
    audioPlayerModule.name,
    trackGroupModule.name
  ]);
  
  module.controller('TrackActionsCtrl', TrackActionsCtrl)
        .directive('srTrackActions', trackActionsDrtFactory);
  
  return module;
});
