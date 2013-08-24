/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackCtrl ($scope, $routeParams, musicInfoSrv, tracksSearchSrv) {
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
  }

  TrackCtrl.$inject = [ '$scope',
                        '$routeParams',
                        'musicInfoSrv',
                        'tracksSearchSrv' ];

  return TrackCtrl;
});
