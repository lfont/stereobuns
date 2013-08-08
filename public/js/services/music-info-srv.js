/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function MusicInfoSrv ($http) {

    this.getTrackInfo = function (artist, name) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + name)
        .then(function (response) {
          return response.data;
        });
    };

    this.getAlbumInfo = function (artist, name) {
      return $http
        .get('/api/artists/' + artist + '/albums/' + name)
        .then(function (response) {
          return response.data;
        });
    };
  }

  MusicInfoSrv.$inject = [ '$http' ];

  return MusicInfoSrv;
});
