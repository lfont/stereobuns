/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './layout-ctrl',
    './stream-ctrl',
    './search-ctrl',
    './search-playlist-ctrl',
    './audio-player-ctrl',
    './audio-player-queue-ctrl',
    './playlist-overview-ctrl'
], function (angular, LayoutCtrl, StreamCtrl,
             SearchCtrl, SearchPlaylistCtrl,
             AudioPlayerCtrl, AudioPlayerQueueCtrl,
             PlaylistOverviewCtrl) {
    'use strict';
    
    return angular.module('soundrocket.controllers', [])
                  .controller('LayoutCtrl', LayoutCtrl)
                  .controller('StreamCtrl', StreamCtrl)
                  .controller('SearchCtrl', SearchCtrl)
                  .controller('SearchPlaylistCtrl', SearchPlaylistCtrl)
                  .controller('AudioPlayerCtrl', AudioPlayerCtrl)
                  .controller('AudioPlayerQueueCtrl', AudioPlayerQueueCtrl)
                  .controller('PlaylistOverviewCtrl', PlaylistOverviewCtrl);
});
