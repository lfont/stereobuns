/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './sound-search-srv',
    './audio-player-srv'
], function (angular, SoundSearchSrvFactory, AudioPlayerSrvFactory) {
    'use strict';
    
    return angular.module('soundrocket.services', [])
                  .service('soundSearchSrv', SoundSearchSrvFactory)
                  .service('audioPlayerSrv', AudioPlayerSrvFactory);
});
