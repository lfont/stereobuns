/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TracksSearchSrv ($http) {

    this.find = function (description) {
      return $http
        .get('/api/tracks/search/' + description, { cache: true })
        .then(function (response) {
          return response.data;
        });
    };

    this.findOne = function (artist, track, trackId) {
      return this
        .find(artist + ' ' + track)
        .then(function (songs) {
          var song = null,
              i, len;

          for (i = 0, len = songs.length; i < len; i++) {
            if (artist === songs[i].artist &&
                track === songs[i].track &&
                (trackId ? trackId === songs[i].trackId : true)) {
              song = songs[i];
              break;
            }
          }

          return song;
        });
    };
  }

  TracksSearchSrv.$inject = [ '$http' ];

  return TracksSearchSrv;
});
