/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './sound-search-srv',
    './audio-player-srv',
    './artwork-srv',
    './user-srv'
], function (angular, SoundSearchSrvFactory,
             AudioPlayerSrvFactory, ArtworkSrvFactory,
             userSrvFactory) {
    'use strict';
    
    return angular.module('soundrocket.services', [])
                  .service('soundSearchSrv', SoundSearchSrvFactory)
                  .service('audioPlayerSrv', AudioPlayerSrvFactory)
                  .service('artworkSrv', ArtworkSrvFactory)
                  .service('userSrv', userSrvFactory);
});
