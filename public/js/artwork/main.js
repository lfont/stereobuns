/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './artwork-srv',
  './artwork-drt'
], function (angular,
             ArtworkSrv,
             artworkDrtFactory) {
  'use strict';
  
  var module = angular.module('soundrocket.artwork', []);
  
  module.service('artworkSrv', ArtworkSrv)
        .directive('srArtwork', artworkDrtFactory);
  
  return module;
});
