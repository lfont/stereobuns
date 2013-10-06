/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'playlist',
    './playlist-chooser-drt-ctrl',
    './playlist-chooser-drt'
], function (angular,
             playlistModule,
             PlaylistChooserDrtCtrl,
             playlistChooserDrtFactory) {
  'use strict';
  
  var module = angular.module('soundrocket.components.playlist-chooser', [
    playlistModule.name
  ]);
  
  module.controller('PlaylistChooserDrtCtrl', PlaylistChooserDrtCtrl)
        .directive('playlistChooser', playlistChooserDrtFactory);
  
  return module;
});
