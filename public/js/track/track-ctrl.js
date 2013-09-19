/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function TrackCtrl ($scope, audioPlayerSrv) {
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

    $scope.isPlaying = false;

    $scope.$watch('song', function (newSong, oldSong) {
      $scope.isPlaying = isPlayerSong() && audioPlayerSrv.getStatus().isPlaying;
    });

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

    $scope.$on('trackGroup:add', function (event, id, track) {
      if (id === 'loved' && track.url === $scope.song.url && !$scope.song.loved) {
        $scope.song.loved = true;
      }
    });

    $scope.$on('trackGroup:remove', function (event, id, track) {
      if (id === 'loved' && track.url === $scope.song.url && $scope.song.loved) {
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

  TrackCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];

  return TrackCtrl;
});
