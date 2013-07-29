/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './songs-mdl',
  './playlist-mdl',
  './user-mdl'
], function (angular,
             SongsMdl, PlaylistMdl,
             UserMdl) {
  'use strict';

  return angular.module('soundrocket.models', [])
                .service('songsMdl', SongsMdl)
                .service('playlistMdl', PlaylistMdl)
                .service('userMdl', UserMdl);
});
