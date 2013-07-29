/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './layout-ctrl',
  './root-ctrl',
  './search-ctrl',
  './search-bar-ctrl',
  './audio-player-bar-ctrl',
  './audio-player-queue-ctrl',
  './playlists-ctrl',
  './playlist-ctrl',
  './songs-status-ctrl',
  './songs-ctrl',
  './user-menu-ctrl'
], function (angular,
             LayoutCtrl,
             RootCtrl,
             SearchCtrl, SearchBarCtrl,
             AudioPlayerBarCtrl, AudioPlayerQueueCtrl,
             PlaylistsCtrl, PlaylistCtrl,
             SongsStatusCtrl, SongsCtrl,
             UserMenuCtrl) {
  'use strict';

  return angular.module('soundrocket.controllers', [])
                .controller('LayoutCtrl', LayoutCtrl)
                .controller('RootCtrl', RootCtrl)
                .controller('SearchCtrl', SearchCtrl)
                .controller('SearchBarCtrl', SearchBarCtrl)
                .controller('AudioPlayerBarCtrl', AudioPlayerBarCtrl)
                .controller('AudioPlayerQueueCtrl', AudioPlayerQueueCtrl)
                .controller('PlaylistsCtrl', PlaylistsCtrl)
                .controller('PlaylistCtrl', PlaylistCtrl)
                .controller('SongsStatusCtrl', SongsStatusCtrl)
                .controller('SongsCtrl', SongsCtrl)
                .controller('UserMenuCtrl', UserMenuCtrl);
});
