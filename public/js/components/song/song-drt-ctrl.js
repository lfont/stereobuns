/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function SongDrtCtrl ($scope, audioPlayerSrv) {
    var DEFAULT_OPTIONS = {
      remove: false,
      queue: true
    };

    function setOptions () {
      $scope.options = angular.extend({}, DEFAULT_OPTIONS, $scope.customOptions);
    }

    function isPlayerSong () {
      var song = audioPlayerSrv.getStatus().song;
      return song &&
             $scope.song &&
             song.url === $scope.song.url;
    }

    $scope.isPlaying = isPlayerSong() && audioPlayerSrv.getStatus().isPlaying;

    $scope.$on('audioPlayer:play', function (event, loaded) {
      $scope.isPlaying = isPlayerSong();
    });

    $scope.$on('audioPlayer:pause', function (event) {
      $scope.isPlaying = false;
    });

    $scope.$on('audioPlayer:resume', function (event) {
      $scope.isPlaying = isPlayerSong();
    });

    $scope.$on('audioPlayer:stop', function (event) {
      $scope.isPlaying = false;
    });

    $scope.$on('songsStore:add', function (event, id, song) {
      if (id === 'loved' && song.url === $scope.song.url && !$scope.song.loved) {
        $scope.song.loved = true;
      }
    });

    $scope.$on('songsStore:remove', function (event, id, song) {
      if (id === 'loved' && song.url === $scope.song.url && $scope.song.loved) {
        $scope.song.loved = false;
      }
    });

    $scope.togglePlay = function () {
      if (isPlayerSong()) {
        if (audioPlayerSrv.getStatus().isPlaying) {
          audioPlayerSrv.pause();
        } else {
          audioPlayerSrv.play();
        }
      } else {
        audioPlayerSrv.play($scope.song);
      }
    };

    $scope.remove = function (songs) {
      $scope.onRemove({ song: songs });
    };

    setOptions();
  }

  SongDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];

  return SongDrtCtrl;
});
