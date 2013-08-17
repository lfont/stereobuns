/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongInfoCtrl ($scope, $routeParams, musicInfoSrv, tracksSearchSrv) {
    $scope.songsStatusTemplateUrl = 'partials/songs-groups.html';
    $scope.playlistsTemplateUrl = 'partials/playlists.html';

    $scope.trackInfo = musicInfoSrv.getTrackInfo($routeParams.artist,
                                                 $routeParams.track);

    $scope.song = tracksSearchSrv.findOne($routeParams);
  }

  SongInfoCtrl.$inject = [ '$scope',
                           '$routeParams',
                           'musicInfoSrv',
                           'tracksSearchSrv' ];

  return SongInfoCtrl;
});
