/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './playlist-ctrl',
  './songs-group-ctrl'
], function (angular,
             PlaylistCtrl,
             SongsGroupCtrl) {
  'use strict';

  return angular.module('soundrocket.controllers', [])
                .controller('PlaylistCtrl', PlaylistCtrl)
                .controller('SongsGroupCtrl', SongsGroupCtrl);
});
