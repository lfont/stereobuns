/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './artwork-drt',
    './song-drt'
], function (angular, ArtworkDrtFactory,
            SongDrtFactory) {
    'use strict';
    
    return angular.module('soundrocket.directives', [])
                  .directive('artwork', ArtworkDrtFactory)
                  .directive('song', SongDrtFactory);
});
