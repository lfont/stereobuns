/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsCtrl ($scope, $routeParams, songsMdl) {
    function setSongsStore (id) {
      var songsStore = songsMdl.getSongsStore(id),
          promise    = songsStore.songs();

      $scope.name = songsStore.name;
      $scope.noSongMessageTemplateUrl = 'no-' + id + '-songs.html';

      promise.then(function (songs) {
        $scope.songs = songs;
      }, function (error) {
        // TODO: handle error
      });
    }

    $scope.songsActionsOptions = {
      play: true,
      filterPlaylists: false
    };

    $scope.songsStatusTemplateUrl = 'songs-status.html';
    $scope.playlistsTemplateUrl = 'playlists.html';
    $scope.noSongMessageTemplateUrl = '';
    $scope.name = '';
    $scope.songs = [];

    $scope.$on('songsStore:add', function (event, id, song) {
      if (id === $routeParams.id) {
        $scope.songs.push(song);
      }
    });

    $scope.$on('songsStore:remove', function (event, id, song) {
      var index;
      if (id === $routeParams.id) {
        index = $scope.songs.indexOf(song);
        $scope.songs.splice(index, 1);
      }
    });

    setSongsStore($routeParams.id);
  }

  SongsCtrl.$inject = [ '$scope', '$routeParams', 'songsMdl' ];

  return SongsCtrl;
});
