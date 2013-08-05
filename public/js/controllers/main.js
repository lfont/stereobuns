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
  './songs-groups-ctrl',
  './songs-group-ctrl',
  './user-menu-ctrl',
  './settings-ctrl',
  './keyboard-shortcuts-ctrl'
], function (angular,
             LayoutCtrl,
             RootCtrl,
             SearchCtrl, SearchBarCtrl,
             AudioPlayerBarCtrl, AudioPlayerQueueCtrl,
             PlaylistsCtrl, PlaylistCtrl,
             SongsGroupsCtrl, SongsGroupCtrl,
             UserMenuCtrl,
             SettingsCtrl,
             KeyboardShortcutsCtrl) {
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
                .controller('SongsGroupsCtrl', SongsGroupsCtrl)
                .controller('SongsGroupCtrl', SongsGroupCtrl)
                .controller('UserMenuCtrl', UserMenuCtrl)
                .controller('SettingsCtrl', SettingsCtrl)
                .controller('KeyboardShortcutsCtrl', KeyboardShortcutsCtrl);
});
