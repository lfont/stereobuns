/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './sound-search-srv',
    './audio-player-srv',
    './artwork-srv'
], function (angular, SoundSearchSrvFactory,
             AudioPlayerSrvFactory, ArtworkSrvFactory) {
    'use strict';
    
    return angular.module('soundrocket.services', [])
                  .service('soundSearchSrv', SoundSearchSrvFactory)
                  .service('audioPlayerSrv', AudioPlayerSrvFactory)
                  .service('artworkSrv', ArtworkSrvFactory);
});
