/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './layout-ctrl',
  './playlist-ctrl',
  './songs-group-ctrl'
], function (angular,
             LayoutCtrl,
             PlaylistCtrl,
             SongsGroupCtrl) {
  'use strict';

  return angular.module('soundrocket.controllers', [])
                .controller('LayoutCtrl', LayoutCtrl)
                .controller('PlaylistCtrl', PlaylistCtrl)
                .controller('SongsGroupCtrl', SongsGroupCtrl);
});
