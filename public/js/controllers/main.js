/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './playlist-ctrl'
], function (angular,
             PlaylistCtrl) {
  'use strict';

  return angular.module('soundrocket.controllers', [])
                .controller('PlaylistCtrl', PlaylistCtrl);
});
