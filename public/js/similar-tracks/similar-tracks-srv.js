/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SimilarTracksSrv ($http) {
    
    this.getTracks = function (artist, track) {
      return $http
        .get('/api/artists/' + artist + '/tracks/' + track + '/similar', { cache: true })
        .then(function (response) {
          return response.data;
        });
    };
  }

  SimilarTracksSrv.$inject = [ '$http' ];

  return SimilarTracksSrv;
});
