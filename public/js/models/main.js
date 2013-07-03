/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './songs-mdl',
    './playlist-mdl'
], function (angular, songsMdlFactory, playlistMdlFactory) {
    'use strict';
    
    return angular.module('soundrocket.models', [])
                  .service('songsMdl', songsMdlFactory)
                  .service('playlistMdl', playlistMdlFactory);
});
