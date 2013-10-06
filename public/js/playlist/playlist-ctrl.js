/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistCtrl ($scope, $routeParams, $location, $dialog, playlistMdl) {
    var currentPlaylist;

    playlistMdl
      .get($routeParams.user, $routeParams.name)
      .then(function (playlist) {
        $scope.playlistName = playlist.name;
        currentPlaylist = playlist;
        playlist
          .getTracks()
          .then(function (tracks) {
            $scope.tracks = tracks;
          });
      });

    $scope.tracksActionsOptions = {
      play: true,
      remove: true
    };

    $scope.trackOptions = {
      remove: true
    };

    $scope.emptyPlaylistMessageTemplateUrl = '';
    $scope.playlistName = '';
    $scope.tracks = null;

    $scope.$watchCollection('tracks', function (newTracks, oldTracks) {
      $scope.emptyPlaylistMessageTemplateUrl = !newTracks || newTracks.length ?
        '' :
        'templates/playlist/empty-playlist.html';
    });

    $scope.$on('playlist:add', function (event, name, track) {
      var trackIndex;
      if (name === $scope.playlistName) {
        trackIndex = $scope.utils.indexOf($scope.tracks, 'url', track.url);
        if (trackIndex < 0) {
          $scope.tracks.push(track);
        }
      }
    });

    $scope.$on('playlist:remove', function (event, name, track) {
      var trackIndex;
      if (name === $scope.playlistName) {
        trackIndex = $scope.utils.indexOf($scope.tracks, 'url', track.url);
        $scope.tracks.splice(trackIndex, 1);
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

          playlistMdl
            .delete(currentPlaylist.name)
            .then(function () {
              $location.path('/' + $routeParams.user);
            });
        });
    };

    $scope.remove = function (tracks) {
      currentPlaylist.remove(tracks);
    };
  }

  PlaylistCtrl.$inject = [ '$scope', '$routeParams',
                           '$location', '$dialog',
                           'playlistMdl' ];

  return PlaylistCtrl;
});
