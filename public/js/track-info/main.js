/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'track-search',
  './track-info-ctrl',
  './track-album-ctrl',
  './similar-tracks-ctrl',
  './track-info-srv'
], function (angular,
             trackSearchModule,
             TrackInfoCtrl,
             TrackAlbumCtrl,
             SimilarTracksCtrl,
             TrackInfoSrv) {
  'use strict';

  var module = angular.module('soundrocket.track-info', [
    trackSearchModule.name
  ]);
  
  module.controller('TrackInfoCtrl', TrackInfoCtrl)
        .controller('TrackAlbumCtrl', TrackAlbumCtrl)
        .controller('SimilarTracksCtrl', SimilarTracksCtrl)
        .service('trackInfoSrv', TrackInfoSrv);
        
  return module;
});
