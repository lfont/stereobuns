/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TopTracksCtrl ($scope, $routeParams, artistInfoSrv) {
    $scope.tracksActionsOptions = {
      play: true
    };
    
    $scope.artist = $routeParams.artist;
    $scope.tracks = null;
    
    artistInfoSrv.getTopTracks($routeParams.artist)
                 .then(function (tracks) {
                    $scope.tracks = tracks;
                 });
  }

  TopTracksCtrl.$inject = [ '$scope', '$routeParams', 'artistInfoSrv' ];

  return TopTracksCtrl;
});
