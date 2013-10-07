/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './playlist-ctrl',
  './playlist-srv',
  './playlist-mdl',
  './chooser/playlist-chooser-ctrl',
  './chooser/playlist-chooser-drt'
], function (angular,
             PlaylistCtrl,
             PlaylistSrv,
             PlaylistMdl,
             PlaylistChooserCtrl,
             playlistChooserDrtFactory) {
  'use strict';

  var module = angular.module('soundrocket.playlist', []);

  module.controller('PlaylistCtrl', PlaylistCtrl)
        .service('playlistSrv', PlaylistSrv)
        .service('playlistMdl', PlaylistMdl)
        .controller('PlaylistChooserCtrl', PlaylistChooserCtrl)
        .directive('srPlaylistChooser', playlistChooserDrtFactory);

  return module;
});
