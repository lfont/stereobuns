/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SimilarTracksCtrl ($scope, $routeParams, trackInfoSrv) {
    $scope.tracks = null;
    
    trackInfoSrv.getSimilar($routeParams.artist, $routeParams.track)
                .then(function (tracks) {
                  $scope.tracks = tracks;
                });
  }
  
  SimilarTracksCtrl.$inject = [ '$scope', '$routeParams', 'trackInfoSrv' ];
  
  return SimilarTracksCtrl;
});
