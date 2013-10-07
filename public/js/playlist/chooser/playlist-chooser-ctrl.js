/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  var PLAYLIST_NAME_PATTERN  = /^\/.+\/playlist\/(.*)/i;
      
  function PlaylistChooserCtrl ($scope, $location, playlistMdl) {
    var DEFAULT_OPTIONS = {
      filter: true
    };

    function filterPlaylistsForLocation (playlists) {
      var filteredPlaylists = [],
          i, len, playlist, matchs;

      for (i = 0, len = playlists.length; i < len; i++) {
        playlist = playlists[i];
        matchs = PLAYLIST_NAME_PATTERN.exec($location.path());
        if (!matchs ||
            matchs[1].toLowerCase() !== playlist.name.toLowerCase())
        {
          filteredPlaylists.push(playlist);
        }
      }

      return filteredPlaylists;
    }

    function loadPlaylists () {
      var opts = angular.extend({}, DEFAULT_OPTIONS, $scope.options);

      playlistMdl
        .getAll()
        .then(function (playlists) {
          $scope.playlists = opts.filter ?
            filterPlaylistsForLocation(playlists) :
            playlists;
        });
    }

    $scope.newPlaylistName = '';

    $scope.$on('playlist:create', function (event, playlist) {
      var index = $scope.playlists.indexOf(playlist);
      if (index < 0) {
        $scope.playlists.push(playlist);
      }
    });

    $scope.$on('playlist:delete', function (event, playlist) {
      var index = $scope.playlists.indexOf(playlist);
      if (index > -1) {
        $scope.playlists.splice(index, 1);
      }
    });

    $scope.createPlaylist = function () {
      if ($scope.playlistForm.$valid) {
        playlistMdl.create($scope.newPlaylistName);
        $scope.newPlaylistName = '';
      }
    };

    $scope.addToPlaylist = function (playlist) {
      playlist.add($scope.tracks);
    };

    loadPlaylists();
  }

  PlaylistChooserCtrl.$inject = [ '$scope', '$location', 'playlistMdl' ];

  return PlaylistChooserCtrl;
});
