/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './songs-mdl'
], function (angular, songsMdlFactory) {
    'use strict';
    
    return angular.module('soundrocket.models', [])
                  .service('songsMdl', songsMdlFactory);
});
