/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './song-progress-drt-ctrl',
    './song-progress-drt',
    'services',
    'filters'
], function (angular,
             SongProgressDrtCtrl,
             songProgressDrtFactory) {
    'use strict';

    var songProgressComponent = angular.module('soundrocket.components.song-progress', [
        'soundrocket.services',
        'soundrocket.filters'
    ]);

    songProgressComponent.controller('SongProgressDrtCtrl', SongProgressDrtCtrl)
                         .directive('songProgress', songProgressDrtFactory);

    return songProgressComponent;
});
