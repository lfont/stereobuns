/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function MusicInfoSrv ($http) {

    this.getAlbum = function (artist, track) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + track + '/album', { cache: true })
        .then(function (response) {
          return response.data;
        });
    };
  }

  MusicInfoSrv.$inject = [ '$http' ];

  return MusicInfoSrv;
});
