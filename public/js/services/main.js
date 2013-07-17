/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './sound-search-srv',
  './audio-player-sound-srv',
  './audio-player-srv',
  './artwork-srv'
], function (angular,
             soundSearchSrvFactory,
             audioPlayerSoundSrvFactory, audioPlayerSrvFactory,
             artworkSrvFactory) {
  'use strict';

  return angular.module('soundrocket.services', [])
                .service('soundSearchSrv', soundSearchSrvFactory)
                .service('audioPlayerSoundSrv', audioPlayerSoundSrvFactory)
                .service('audioPlayerSrv', audioPlayerSrvFactory)
                .service('artworkSrv', artworkSrvFactory);
});
