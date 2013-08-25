/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function CommentsMdl ($http) {

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

  CommentsMdl.$inject = [ '$http' ];

  return CommentsMdl;
});
