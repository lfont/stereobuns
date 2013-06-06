/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'angular-ui',
    'controllers'
], function (angular) {
    'use strict';
    
    return angular.module('soundrocket', [ 'soundrocket.controllers' ]);
});
