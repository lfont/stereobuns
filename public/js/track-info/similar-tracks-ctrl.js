/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SimilarTracksCtrl ($scope, $routeParams, trackInfoSrv) {
    $scope.tracks = trackInfoSrv.getSimilar($routeParams.artist,
                                            $routeParams.track);
  }
  
  SimilarTracksCtrl.$inject = [ '$scope', '$routeParams', 'trackInfoSrv' ];
  
  return SimilarTracksCtrl;
});
