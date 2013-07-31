/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './songs-group-mdl',
  './songs-groups-mdl',
  './playlist-mdl',
  './playlists-mdl',
  './user-mdl'
], function (angular,
             SongsGroupMdl, SongsGroupsMdl,
             PlaylistMdl, PlaylistsMdl,
             UserMdl) {
  'use strict';

  return angular.module('soundrocket.models', [])
                .service('songsGroupMdl', SongsGroupMdl)
                .service('songsGroupsMdl', SongsGroupsMdl)
                .service('playlistMdl', PlaylistMdl)
                .service('playlistsMdl', PlaylistsMdl)
                .service('userMdl', UserMdl);
});
