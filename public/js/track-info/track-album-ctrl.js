/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackAlbumCtrl ($scope, $routeParams, trackInfoSrv) {
    $scope.album = null;
    
    trackInfoSrv
      .getAlbum($routeParams.artist, $routeParams.track)
      .then(function (album) {
        $scope.album = album;
      });
  }

  TrackAlbumCtrl.$inject = [ '$scope', '$routeParams', 'trackInfoSrv' ];

  return TrackAlbumCtrl;
});
