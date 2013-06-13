/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './artwork-drt'
], function (angular, ArtworkDrtFactory) {
    'use strict';
    
    return angular.module('soundrocket.directives', [])
                  .directive('artwork', ArtworkDrtFactory);
});
