/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackInfoCtrl ($scope, $routeParams, trackInfoSrv, trackSearchSrv) {
    $scope.newComment = '';
    $scope.comments = null;
    $scope.song = null;

    function loadComments () {
      trackInfoSrv.getComments($routeParams.artist, $routeParams.track)
                  .then(function (comments) {
                    $scope.comments = comments;
                  });
    }

    trackSearchSrv.findOne($routeParams.artist, $routeParams.track, $routeParams.trackId)
                  .then(function (song) {
                    $scope.song = song;
                  });

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

  TrackInfoCtrl.$inject = [ '$scope', '$routeParams', 'trackInfoSrv',
                            'trackSearchSrv' ];

  return TrackInfoCtrl;
});
