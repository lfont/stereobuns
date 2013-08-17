/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TracksSearchSrv ($http) {

    this.find = function (description) {
      return $http
        .get('/api/tracks/search/' + description)
        .then(function (response) {
          return response.data;
        });
    };

    this.findOne = function (filter) {
      return this
        .find(filter.artist + ' ' + filter.track)
        .then(function (tracks) {
          var track = null,
              i, len;

          for (i = 0, len = tracks.length; i < len; i++) {
            if (filter.artist === tracks[i].artist &&
                filter.track === tracks[i].track) {
              track = tracks[i];
              break;
            }
          }

          return track;
        });
    };
  }

  TracksSearchSrv.$inject = [ '$http' ];

  return TracksSearchSrv;
});
