/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './songs-mdl',
  './playlist-store-mdl',
  './playlist-mdl',
  './user-mdl'
], function (angular,
             SongsMdl,
             PlaylistStoreMdl, PlaylistMdl,
             UserMdl) {
  'use strict';

  return angular.module('soundrocket.models', [])
                .service('songsMdl', SongsMdl)
                .service('playlistStoreMdl', PlaylistStoreMdl)
                .service('playlistMdl', PlaylistMdl)
                .service('userMdl', UserMdl);
});
