/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsGroupCtrl ($scope, $routeParams, songsGroupsMdl, songUtilsSrv) {
    function setSongsGroup (id) {
      var songsGroup = songsGroupsMdl.get(id);
      $scope.name  = songsGroup.name;
      $scope.songs = songsGroup.songs();
    }

    $scope.songsActionsOptions = {
      play: true,
      filterPlaylists: false
    };

    $scope.songsStatusTemplateUrl = 'partials/songs-groups.html';
    $scope.playlistsTemplateUrl = 'partials/playlists.html';
    $scope.noSongMessageTemplateUrl = '';
    $scope.name = '';
    $scope.songs = null;

    $scope.$watchCollection('songs', function (newSongs, oldSongs) {
      $scope.noSongMessageTemplateUrl = !newSongs || newSongs.length ?
        '' :
        'partials/no-' + $routeParams.id + '-songs.html';
    });

    $scope.$on('songsGroup:add', function (event, id, song) {
      var songIndex;
      if (id === $routeParams.id) {
        songIndex = songUtilsSrv.indexOf($scope.songs.$$v, song.url);
        if (songIndex < 0) {
          $scope.songs.$$v.push(song);
        }
      }
    });

    $scope.$on('songsGroup:remove', function (event, id, song) {
      var songIndex;
      if (id === $routeParams.id) {
        songIndex = songUtilsSrv.indexOf($scope.songs.$$v, song.url);
        $scope.songs.$$v.splice(songIndex, 1);
      }
    });

    setSongsGroup($routeParams.id);
  }

  SongsGroupCtrl.$inject = [ '$scope', '$routeParams',
                             'songsGroupsMdl', 'songUtilsSrv' ];

  return SongsGroupCtrl;
});
