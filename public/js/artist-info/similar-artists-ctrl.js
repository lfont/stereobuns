/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SimilarArtistsCtrl ($scope, $routeParams, artistInfoSrv) {
    $scope.artists = artistInfoSrv.getSimilar($routeParams.artist);
  }

  SimilarArtistsCtrl.$inject = [ '$scope', '$routeParams', 'artistInfoSrv' ];

  return SimilarArtistsCtrl;
});
