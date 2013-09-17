/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './artist-info-ctrl',
  './similar-artists-ctrl',
  './top-albums-ctrl',
  './top-tracks-ctrl',
  './artist-info-srv'
], function (angular,
             ArtistInfoCtrl,
             SimilarArtistsCtrl,
             TopAlbumsCtrl,
             TopTracksCtrl,
             ArtistInfoSrv) {
  'use strict';

  var module = angular.module('soundrocket.artist-info', []);
  
  module.controller('ArtistInfoCtrl', ArtistInfoCtrl)
        .controller('SimilarArtistsCtrl', SimilarArtistsCtrl)
        .controller('TopAlbumsCtrl', TopAlbumsCtrl)
        .controller('TopTracksCtrl', TopTracksCtrl)
        .service('artistInfoSrv', ArtistInfoSrv);
        
  return module;
});
