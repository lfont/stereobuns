/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function MusicInfoSrv ($http) {

    this.getTrackInfo = function (artist, track) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + track)
        .then(function (response) {
          return response.data;
        });
    };
  }

  MusicInfoSrv.$inject = [ '$http' ];

  return MusicInfoSrv;
});
