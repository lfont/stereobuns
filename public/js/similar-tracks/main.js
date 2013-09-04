/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './similar-tracks-ctrl',
  './similar-tracks-srv'
], function (angular,
             SimilarTracksCtrl,
             SimilarTracksSrv) {
  'use strict';
  
  var module = angular.module('soundrocket.similar-tracks', []);
  
  module.controller('SimilarTracksCtrl', SimilarTracksCtrl)
        .service('similarTracksSrv', SimilarTracksSrv);
  
  return module;
});
