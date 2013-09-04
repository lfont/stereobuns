/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackSrv ($http) {

    this.getAlbum = function (artist, track) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + track + '/album', { cache: true })
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

  TrackSrv.$inject = [ '$http' ];

  return TrackSrv;
});
