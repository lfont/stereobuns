/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistsCtrl ($scope, $location, playlistMdl) {
    $scope.playlistStores = playlistMdl.getPlaylistStores();

    $scope.isCurrentPlaylistStore = function (playlistStore) {
      var playlistStoreNamePattern = /^\/playlist\/(.*)/,
          matchs = playlistStoreNamePattern.exec($location.path());

      return matchs &&
             matchs[1].toLowerCase() === playlistStore.name.toLowerCase();
    };
  }

  PlaylistsCtrl.$inject = [ '$scope', '$location', 'playlistMdl' ];

  return PlaylistsCtrl;
});
