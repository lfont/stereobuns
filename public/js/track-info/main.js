/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'track-search',
  './track-info-ctrl',
  './similar-tracks-ctrl',
  './track-info-srv'
], function (angular,
             trackSearchModule,
             TrackInfoCtrl,
             SimilarTracksCtrl,
             TrackInfoSrv) {
  'use strict';

  var module = angular.module('soundrocket.track-info', [
    trackSearchModule.name
  ]);
  
  module.controller('TrackInfoCtrl', TrackInfoCtrl)
        .controller('SimilarTracksCtrl', SimilarTracksCtrl)
        .service('trackInfoSrv', TrackInfoSrv);
        
  return module;
});
