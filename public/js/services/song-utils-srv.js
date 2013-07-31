/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function SongUtilsSrv () {

    this.copy = function (song) {
      var newSong = angular.copy(song);
      delete newSong._id;
      return newSong;
    };

    this.indexOf = function (songs, url) {
      var index = -1,
          i, len;
      for (i = 0, len = songs.length; i < len; i++) {
        if (songs[i].url === url) {
          index = i;
          break;
        }
      }
      return index;
    };
  }

  return SongUtilsSrv;
});
