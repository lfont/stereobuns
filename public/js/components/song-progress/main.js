/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './song-progress-drt-ctrl',
    './song-progress-drt'
], function (angular,
             SongProgressDrtCtrl,
             songProgressDrtFactory) {
    'use strict';

    var songProgressComponent = angular.module('soundrocket.components.song-progress', [
        'soundrocket.audio-player'
    ]);

    songProgressComponent.controller('SongProgressDrtCtrl', SongProgressDrtCtrl)
                         .directive('songProgress', songProgressDrtFactory);

    return songProgressComponent;
});
