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

    this.findOne = function (artistName, trackName, trackId) {
      return this
        .find(artistName + ' ' + trackName)
        .then(function (tracks) {
          var track = null,
              i, len;

          for (i = 0, len = tracks.length; i < len; i++) {
            if (artistName === tracks[i].artist &&
                trackName === tracks[i].name) {
              track = tracks[i]; // match
              if (!trackId || trackId === tracks[i].trackId) {
                break; // best match
              }
            }
          }

          return track;
        });
    };
  }

  TracksSearchSrv.$inject = [ '$http' ];

  return TracksSearchSrv;
});
