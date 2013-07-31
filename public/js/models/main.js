/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './songs-mdl',
  './playlist-mdl',
  './playlists-mdl',
  './user-mdl'
], function (angular,
             SongsMdl,
             PlaylistMdl, PlaylistsMdl,
             UserMdl) {
  'use strict';

  return angular.module('soundrocket.models', [])
                .service('songsMdl', SongsMdl)
                .service('playlistMdl', PlaylistMdl)
                .service('playlistsMdl', PlaylistsMdl)
                .service('userMdl', UserMdl);
});
