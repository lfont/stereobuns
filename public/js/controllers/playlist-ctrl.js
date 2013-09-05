/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistCtrl ($scope, $routeParams, $location, $dialog,
                         playlistsMdl) {
    var currentPlaylist;

    function setPlaylist (user, name) {
      // TODO get the user's playlist
      playlistsMdl
        .get(name)
        .then(function (playlist) {
          $scope.playlistName = playlist.name;
          currentPlaylist = playlist;
          playlist
            .songs()
            .then(function (songs) {
              $scope.songs = songs;
            });
        });
    }

    $scope.songsActionsOptions = {
      play: true,
      remove: true
    };

    $scope.songOptions = {
      remove: true
    };

    $scope.noSongMessageTemplateUrl = '';
    $scope.playlistName = '';
    $scope.songs = null;

    $scope.$watchCollection('songs', function (newSongs, oldSongs) {
      $scope.noSongMessageTemplateUrl = !newSongs || newSongs.length ?
        '' :
        'partials/no-playlist-songs.html';
    });

    $scope.$on('playlist:add', function (event, name, song) {
      var songIndex;
      if (name === $scope.playlistName) {
        songIndex = $scope.utils.indexOf($scope.songs, 'url', song.url);
        if (songIndex < 0) {
          $scope.songs.push(song);
        }
      }
    });

    $scope.$on('playlist:remove', function (event, name, song) {
      var songIndex;
      if (name === $scope.playlistName) {
        songIndex = $scope.utils.indexOf($scope.songs, 'url', song.url);
        $scope.songs.splice(songIndex, 1);
      }
    });

    $scope.openDeleteConfirmationBox = function () {
      $dialog.messageBox(
        'Playlist Deletion',
        '"' + currentPlaylist.name + '" will be deleted.',
        [
          { label: 'Cancel', result: false },
          { label: 'Delete', result: true, cssClass: 'btn-danger' }
        ])
        .open()
        .then(function (confirmed) {
          if (!confirmed) {
            return;
          }

          playlistsMdl
            .delete(currentPlaylist)
            .then(function () {
              $location.path('/' + $routeParams.user);
            });
        });
    };

    $scope.remove = function (songs) {
      currentPlaylist.remove(songs);
    };

    setPlaylist($routeParams.user, $routeParams.name);
  }

  PlaylistCtrl.$inject = [ '$scope', '$routeParams',
                           '$location', '$dialog',
                           'playlistsMdl' ];

  return PlaylistCtrl;
});
