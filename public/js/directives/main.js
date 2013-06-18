/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './artwork-drt',
    './song-drt',
    './song-bar-drt'
], function (angular, ArtworkDrtFactory,
            SongDrtFactory, SongBarDrtFactory) {
    'use strict';
    
    return angular.module('soundrocket.directives', [])
                  .directive('artwork', ArtworkDrtFactory)
                  .directive('song', SongDrtFactory)
                  .directive('songbar', SongBarDrtFactory);
});
