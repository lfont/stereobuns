/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackCtrl ($scope, $routeParams, trackInfoSrv, trackSearchSrv) {

    function loadComments () {
      $scope.comments = trackInfoSrv.getComments($routeParams.artist,
                                                 $routeParams.track);
    }

    trackInfoSrv
      .getAlbum($routeParams.artist, $routeParams.track)
      .then(function (album) {
        $scope.album = album;
      });

    $scope.album = null;

    $scope.song = trackSearchSrv.findOne($routeParams.artist,
                                         $routeParams.track,
                                         $routeParams.trackId);

    $scope.newComment = '';
    $scope.comments = null;

    $scope.addComment = function () {
      if (!$scope.commentForm.$valid) {
        return;
      }

      trackInfoSrv
        .addComment($routeParams.artist, $routeParams.track, $scope.newComment)
        .then(function () {
          $scope.newComment = '';
          loadComments();
        });
    };

    loadComments();
  }

  TrackCtrl.$inject = [ '$scope', '$routeParams',
                        'trackInfoSrv', 'trackSearchSrv' ];

  return TrackCtrl;
});
