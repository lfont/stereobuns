/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackCtrl ($scope, $routeParams, musicInfoSrv,
                      tracksSearchSrv, commentsMdl) {

    function loadComments () {
      $scope.comments = commentsMdl.getComments($routeParams.artist,
                                                $routeParams.track);
    }

    $scope.songsStatusTemplateUrl = 'partials/songs-groups.html';
    $scope.playlistsTemplateUrl = 'partials/playlists.html';

    musicInfoSrv
      .getAlbum($routeParams.artist, $routeParams.track)
      .then(function (album) {
        $scope.album = album;
      });

    $scope.album = null;
    $scope.song = tracksSearchSrv.findOne($routeParams.artist,
                                          $routeParams.track,
                                          $routeParams.trackId);

    $scope.newComment = '';
    $scope.comments = null;

    $scope.addComment = function () {
      if (!$scope.commentForm.$valid) {
        return;
      }

      commentsMdl
        .addComment($routeParams.artist, $routeParams.track, $scope.newComment)
        .then(function () {
          $scope.newComment = '';
          loadComments();
        });
    };

    loadComments();
  }

  TrackCtrl.$inject = [ '$scope',
                        '$routeParams',
                        'musicInfoSrv',
                        'tracksSearchSrv',
                        'commentsMdl' ];

  return TrackCtrl;
});
