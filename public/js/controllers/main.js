/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './layout-ctrl',
    './search-ctrl',
    './search-bar-ctrl',
    './audio-player-ctrl',
    './audio-player-queue-ctrl',
    './playlist-overview-ctrl'
], function (angular, LayoutCtrl,
             SearchCtrl, SearchBarCtrl,
             AudioPlayerCtrl, AudioPlayerQueueCtrl,
             PlaylistOverviewCtrl) {
    'use strict';
    
    return angular.module('soundrocket.controllers', [])
                  .controller('LayoutCtrl', LayoutCtrl)
                  .controller('SearchCtrl', SearchCtrl)
                  .controller('SearchBarCtrl', SearchBarCtrl)
                  .controller('AudioPlayerCtrl', AudioPlayerCtrl)
                  .controller('AudioPlayerQueueCtrl', AudioPlayerQueueCtrl)
                  .controller('PlaylistOverviewCtrl', PlaylistOverviewCtrl);
});
