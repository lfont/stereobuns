/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongInfoCtrl ($scope, $routeParams, musicInfoSrv) {
    $scope.songsStatusTemplateUrl = 'partials/songs-groups.html';
    $scope.playlistsTemplateUrl = 'partials/playlists.html';

    $scope.trackInfo = null;
    $scope.albumInfo = null;

    musicInfoSrv
      .getTrackInfo($routeParams.artistName, $routeParams.songName)
      .then(function (trackInfo) {
        $scope.trackInfo = trackInfo;

        if (trackInfo.album) {
          $scope.albumInfo = musicInfoSrv.getAlbumInfo(trackInfo.artist,
                                                       trackInfo.album.name);
        }
      });
  }

  SongInfoCtrl.$inject = [ '$scope', '$routeParams', 'musicInfoSrv' ];

  return SongInfoCtrl;
});
