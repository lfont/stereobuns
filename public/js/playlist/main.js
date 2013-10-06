/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './playlist-ctrl',
  './playlist-srv',
  './playlist-mdl'
], function (angular,
             PlaylistCtrl,
             PlaylistSrv,
             PlaylistMdl) {
  'use strict';

  var module = angular.module('soundrocket.playlist', []);

  module.controller('PlaylistCtrl', PlaylistCtrl)
        .service('playlistSrv', PlaylistSrv)
        .service('playlistMdl', PlaylistMdl);

  return module;
});
