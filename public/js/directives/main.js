/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './artwork-drt',
    './song-drt',
    './song-bar-drt',
    './no-scroll-propagation-drt',
    './ui-scrollfix-drt',
    'controllers'
], function (angular, ArtworkDrtFactory,
             SongDrtFactory, SongBarDrtFactory,
             noScrollPropagationDrtFactory,
             uiScrollfixDrtFactory) {
    'use strict';
    
    return angular.module('soundrocket.directives', [ 'soundrocket.controllers' ])
                  .directive('artwork', ArtworkDrtFactory)
                  .directive('song', SongDrtFactory)
                  .directive('songbar', SongBarDrtFactory)
                  .directive('noScrollPropagation', noScrollPropagationDrtFactory)
                  .directive('uiScrollfix', uiScrollfixDrtFactory);
});
