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
      var description = artistName + ' ' + trackName;

      return $http
        .get('/api/tracks/search/' + description + '/' + trackId, { cache: true })
        .then(function (response) {
          return response.data;
        });
    };
  }

  TracksSearchSrv.$inject = [ '$http' ];

  return TracksSearchSrv;
});
