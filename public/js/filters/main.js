/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './time-flt'
], function (angular, TimeFltFactory) {
    'use strict';
    
    return angular.module('soundrocket.filters', [])
                  .filter('time', TimeFltFactory);
});
