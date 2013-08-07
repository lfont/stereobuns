/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistCtrl ($scope, $routeParams, $location, $dialog,
                         playlistsMdl, songUtilsSrv) {
    var currentPlaylist;

    function setPlaylist (name) {
      playlistsMdl
        .get(name)
        .then(function (playlist) {
          $scope.name = playlist.name;
          $scope.songs = playlist.songs();
          currentPlaylist = playlist;
        });
    }

    $scope.songsActionsOptions = {
      play: true,
      remove: true
    };

    $scope.songOptions = {
      remove: true
    };

    $scope.songsStatusTemplateUrl = 'partials/songs-groups.html';
    $scope.playlistsTemplateUrl = 'partials/playlists.html';
    $scope.noSongMessageTemplateUrl = '';
    $scope.name = '';
    $scope.songs = null;

    $scope.$watchCollection('songs', function (newSongs, oldSongs) {
      $scope.noSongMessageTemplateUrl = !newSongs || newSongs.length ?
        '' :
        'partials/no-playlist-songs.html';
    });

    $scope.$on('playlist:add', function (event, name, song) {
      var songIndex;
      if (name === $scope.name) {
        songIndex = songUtilsSrv.indexOf($scope.songs.$$v, song.url);
        if (songIndex < 0) {
          $scope.songs.$$v.push(song);
        }
      }
    });

    $scope.$on('playlist:remove', function (event, name, song) {
      var songIndex;
      if (name === $scope.name) {
        songIndex = songUtilsSrv.indexOf($scope.songs.$$v, song.url);
        $scope.songs.$$v.splice(songIndex, 1);
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
              $location.path('/songs/loved');
            });
        });
    };

    $scope.remove = function (songs) {
      currentPlaylist.remove(songs);
    };

    setPlaylist($routeParams.name);
  }

  PlaylistCtrl.$inject = [ '$scope', '$routeParams',
                           '$location', '$dialog',
                           'playlistsMdl', 'songUtilsSrv' ];

  return PlaylistCtrl;
});
