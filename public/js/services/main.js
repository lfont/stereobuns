/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './artwork-srv',
  './tracks-search-srv',
  './sound-srv',
  './sound-manager-srv',
  './audio-player-srv',
  './song-utils-srv',
  './music-info-srv'
], function (angular,
             ArtworkSrv,
             TracksSearchSrv,
             SoundSrv, SoundManagerSrv, AudioPlayerSrv,
             SongUtilsSrv,
             MusicInfoSrv) {
  'use strict';

  return angular.module('soundrocket.services', [])
                .service('artworkSrv', ArtworkSrv)
                .service('tracksSearchSrv', TracksSearchSrv)
                .service('soundSrv', SoundSrv)
                .service('soundManagerSrv', SoundManagerSrv)
                .service('audioPlayerSrv', AudioPlayerSrv)
                .service('songUtilsSrv', SongUtilsSrv)
                .service('musicInfoSrv', MusicInfoSrv);
});
