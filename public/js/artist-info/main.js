/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './artist-info-ctrl',
  './similar-artists-ctrl',
  './top-tracks-ctrl',
  './artist-info-srv',
  'angular-sanitize'
], function (angular,
             ArtistInfoCtrl,
             SimilarArtistsCtrl,
             TopTracksCtrl,
             ArtistInfoSrv) {
  'use strict';

  var module = angular.module('soundrocket.artist-info', [
    'ngSanitize'
  ]);
  
  module.controller('ArtistInfoCtrl', ArtistInfoCtrl)
        .controller('SimilarArtistsCtrl', SimilarArtistsCtrl)
        .controller('TopTracksCtrl', TopTracksCtrl)
        .service('artistInfoSrv', ArtistInfoSrv);
        
  return module;
});
