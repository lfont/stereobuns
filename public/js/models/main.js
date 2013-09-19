/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './playlist-mdl',
  './playlists-mdl'
], function (angular,
             PlaylistMdl, PlaylistsMdl) {
  'use strict';

  return angular.module('soundrocket.models', [])
                .service('playlistMdl', PlaylistMdl)
                .service('playlistsMdl', PlaylistsMdl);
});
