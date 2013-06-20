/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './time-flt',
    './song-flt'
], function (angular, timeFltFactory, songFltFactory) {
    'use strict';
    
    return angular.module('soundrocket.filters', [])
                  .filter('time', timeFltFactory)
                  .filter('song', songFltFactory);
});
