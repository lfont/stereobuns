/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TracksSearchSrv ($http) {

    this.search = function (query) {
      return $http
        .get('/api/tracks/search/' + query)
        .then(function (response) {
          return response.data;
        });
    };
  }

  TracksSearchSrv.$inject = [ '$http' ];

  return TracksSearchSrv;
});
