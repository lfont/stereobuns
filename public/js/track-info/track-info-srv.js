/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackInfoSrv ($http) {

    this.getAlbum = function (artist, track) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + track + '/album', { cache: true })
        .then(function (response) {
          return response.data;
        });
    };
    
    this.getSimilar = function (artist, track) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + track + '/similar', { cache: true })
        .then(function (response) {
          return response.data;
        });
    };
    
    this.addComment = function (artist, track, body) {
      return $http
        .post('/api/artists/' + artist + '/tracks/' + track + '/comments',
              { body: body });
    };

    this.getComments = function (artist, track) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + track + '/comments')
        .then(function (response) {
          return response.data;
        });
    };
  }

  TrackInfoSrv.$inject = [ '$http' ];

  return TrackInfoSrv;
});
