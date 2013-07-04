/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './layout-ctrl',
    './search-ctrl',
    './search-bar-ctrl',
    './audio-player-bar-ctrl',
    './audio-player-queue-ctrl',
    './song-drt-ctrl',
    './song-bar-drt-ctrl',
    './playlists-ctrl',
    './playlist-ctrl',
    './songs-ctrl',
    './user-menu-ctrl'
], function (angular, LayoutCtrl,
             SearchCtrl, SearchBarCtrl,
             AudioPlayerBarCtrl, AudioPlayerQueueCtrl,
             SongDrtCtrl, SongBarDrtCtrl,
             PlaylistsCtrl, PlaylistCtrl,
             SongsCtrl, UserMenuCtrl) {
    'use strict';
    
    return angular.module('soundrocket.controllers', [])
                  .controller('LayoutCtrl', LayoutCtrl)
                  .controller('SearchCtrl', SearchCtrl)
                  .controller('SearchBarCtrl', SearchBarCtrl)
                  .controller('AudioPlayerBarCtrl', AudioPlayerBarCtrl)
                  .controller('AudioPlayerQueueCtrl', AudioPlayerQueueCtrl)
                  .controller('SongDrtCtrl', SongDrtCtrl)
                  .controller('SongBarDrtCtrl', SongBarDrtCtrl)
                  .controller('PlaylistsCtrl', PlaylistsCtrl)
                  .controller('PlaylistCtrl', PlaylistCtrl)
                  .controller('SongsCtrl', SongsCtrl)
                  .controller('UserMenuCtrl', UserMenuCtrl);
});
