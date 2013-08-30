/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistsCtrl ($scope, $location, userMdl, playlistsMdl) {
    $scope.userName = userMdl.getName();
    $scope.playlists = playlistsMdl.getAll();

    $scope.isCurrentPlaylist = function (playlist) {
      var playlistNamePattern = /^\/.+\/playlist\/(.*)/i,
          matchs = playlistNamePattern.exec($location.path());

      return matchs &&
             matchs[1].toLowerCase() === playlist.name.toLowerCase();
    };
  }

  PlaylistsCtrl.$inject = [ '$scope', '$location',
                            'userMdl', 'playlistsMdl' ];

  return PlaylistsCtrl;
});
