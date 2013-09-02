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
  './playlist-ctrl',
  './songs-group-ctrl',
  './user-menu-ctrl',
  './settings-ctrl',
  './keyboard-shortcuts-ctrl',
  './track-ctrl',
  './user-profile-ctrl',
  './user-profile-menu-ctrl',
  './similar-tracks-ctrl'
], function (angular,
             LayoutCtrl,
             RootCtrl,
             SearchCtrl,
             SearchBarCtrl,
             AudioPlayerBarCtrl,
             AudioPlayerQueueCtrl,
             PlaylistCtrl,
             SongsGroupCtrl,
             UserMenuCtrl,
             SettingsCtrl,
             KeyboardShortcutsCtrl,
             TrackCtrl,
             UserProfileCtrl, UserProfileMenuCtrl,
             SimilarTracksCtrl) {
  'use strict';

  return angular.module('soundrocket.controllers', [])
                .controller('LayoutCtrl', LayoutCtrl)
                .controller('RootCtrl', RootCtrl)
                .controller('SearchCtrl', SearchCtrl)
                .controller('SearchBarCtrl', SearchBarCtrl)
                .controller('AudioPlayerBarCtrl', AudioPlayerBarCtrl)
                .controller('AudioPlayerQueueCtrl', AudioPlayerQueueCtrl)
                .controller('PlaylistCtrl', PlaylistCtrl)
                .controller('SongsGroupCtrl', SongsGroupCtrl)
                .controller('UserMenuCtrl', UserMenuCtrl)
                .controller('SettingsCtrl', SettingsCtrl)
                .controller('KeyboardShortcutsCtrl', KeyboardShortcutsCtrl)
                .controller('TrackCtrl', TrackCtrl)
                .controller('UserProfileCtrl', UserProfileCtrl)
                .controller('UserProfileMenuCtrl', UserProfileMenuCtrl)
                .controller('SimilarTracksCtrl', SimilarTracksCtrl);
});
