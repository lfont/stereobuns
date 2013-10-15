/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function ArtistInfoCtrl ($scope, $routeParams, artistInfoSrv) {
    $scope.artist = null;
    
    artistInfoSrv.getInfo($routeParams.artist)
                 .then(function (artist) {
                    $scope.artist = artist;
                 });
  }

  ArtistInfoCtrl.$inject = [ '$scope', '$routeParams', 'artistInfoSrv' ];

  return ArtistInfoCtrl;
});
