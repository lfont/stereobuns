/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SimilarTracksCtrl ($scope, $routeParams, musicInfoSrv) {
    $scope.tracks = musicInfoSrv
      .getSimilarTracks($routeParams.artist, $routeParams.track);
  }
  
  SimilarTracksCtrl.$inject = [ '$scope', '$routeParams',
                                'musicInfoSrv' ];
  
  return SimilarTracksCtrl;
});
