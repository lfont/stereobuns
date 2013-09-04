/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SimilarTracksCtrl ($scope, $routeParams, similarTracksSrv) {
    $scope.tracks = similarTracksSrv.getTracks($routeParams.artist,
                                               $routeParams.track);
  }
  
  SimilarTracksCtrl.$inject = [ '$scope', '$routeParams',
                                'similarTracksSrv' ];
  
  return SimilarTracksCtrl;
});
