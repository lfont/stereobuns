/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'angular-ui',
    'controllers',
    'services'
], function (angular) {
    'use strict';
    
    return angular.module('soundrocket', [
        'ui',
        'soundrocket.controllers',
        'soundrocket.services'
    ]);
});
