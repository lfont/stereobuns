/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './songs-mdl',
    './playlist-mdl',
    './user-mdl'
], function (angular,
             songsMdlFactory, playlistMdlFactory,
             userMdlFactory) {
    'use strict';
    
    return angular.module('soundrocket.models', [])
                  .service('songsMdl', songsMdlFactory)
                  .service('playlistMdl', playlistMdlFactory)
                  .service('userMdl', userMdlFactory);
});
