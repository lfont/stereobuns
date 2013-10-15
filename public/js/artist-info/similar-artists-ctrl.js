/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SimilarArtistsCtrl ($scope, $routeParams, artistInfoSrv) {
    $scope.artists = null;
    
    artistInfoSrv.getSimilar($routeParams.artist)
                 .then(function (artists) {
                    $scope.artists = artists;  
                 });
  }

  SimilarArtistsCtrl.$inject = [ '$scope', '$routeParams', 'artistInfoSrv' ];

  return SimilarArtistsCtrl;
});
