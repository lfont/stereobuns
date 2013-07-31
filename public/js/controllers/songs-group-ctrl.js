/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsGroupCtrl ($scope, $routeParams, songsGroupsMdl) {
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
      if (id === $routeParams.id) {
        $scope.songs.$$v.push(song);
      }
    });

    $scope.$on('songsGroup:remove', function (event, id, song) {
      var index;
      if (id === $routeParams.id) {
        index = $scope.songs.$$v.indexOf(song);
        $scope.songs.$$v.splice(index, 1);
      }
    });

    setSongsGroup($routeParams.id);
  }

  SongsGroupCtrl.$inject = [ '$scope', '$routeParams', 'songsGroupsMdl' ];

  return SongsGroupCtrl;
});
