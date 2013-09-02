/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsGroupCtrl ($scope, $routeParams, songsGroupsMdl, songUtilsSrv) {
    
    function setSongsGroup (user, group) {
      // TODO: get the user's group
      var songsGroup = songsGroupsMdl.get(group);
      songsGroup
        .songs()
        .then(function (songs) {
          $scope.songs = songs;
        });
    }

    $scope.songsActionsOptions = {
      play: true,
      filterPlaylists: false
    };

    $scope.noSongMessageTemplateUrl = '';
    $scope.songs = null;

    $scope.$watchCollection('songs', function (newSongs, oldSongs) {
      $scope.noSongMessageTemplateUrl = !newSongs || newSongs.length ?
        '' :
        'partials/no-' + $routeParams.group + '-songs.html';
    });

    $scope.$on('songsGroup:add', function (event, id, song) {
      var songIndex;
      if (id === $routeParams.group) {
        songIndex = songUtilsSrv.indexOf($scope.songs, song.url);
        if (songIndex < 0) {
          $scope.songs.push(song);
        }
      }
    });

    $scope.$on('songsGroup:remove', function (event, id, song) {
      var songIndex;
      if (id === $routeParams.group) {
        songIndex = songUtilsSrv.indexOf($scope.songs, song.url);
        $scope.songs.splice(songIndex, 1);
      }
    });

    setSongsGroup($routeParams.user, $routeParams.group || 'loved');
  }

  SongsGroupCtrl.$inject = [ '$scope', '$routeParams',
                             'songsGroupsMdl', 'songUtilsSrv' ];

  return SongsGroupCtrl;
});
