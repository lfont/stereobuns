/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function AudioPlayerBarCtrl ($scope, audioPlayerSrv, songsGroupsMdl) {
    function isCurrentSong (song) {
      return $scope.song &&
             song &&
             $scope.song.url === song.url;
    }

    $scope.audioPlayerQueueTemplate = 'audio-player-queue.html';
    $scope.song = null;
    $scope.isPlaying = false;
    $scope.shouldRepeat = false;
    $scope.shouldOpenQueue = false;

    $scope.$on('audioPlayer:play', function (event, loaded) {
      $scope.isPlaying = true;
      $scope.song = audioPlayerSrv.getStatus().song;
    });

    $scope.$on('audioPlayer:pause', function (event) {
      $scope.isPlaying = false;
    });

    $scope.$on('audioPlayer:resume', function (event) {
      $scope.isPlaying = true;
    });

    $scope.$on('audioPlayer:stop', function (event) {
      $scope.isPlaying = false;
      $scope.song = null;
    });

    $scope.$on('audioPlayerQueue:close', function (event) {
      $scope.shouldOpenQueue = false;
    });

    $scope.$on('songsGroup:add', function (event, id, song) {
      if (id === 'loved' && isCurrentSong(song) && !$scope.song.loved) {
        $scope.song.loved = true;
      }
    });

    $scope.$on('songsGroup:remove', function (event, id, song) {
      if (id === 'loved' && isCurrentSong(song) && $scope.song.loved) {
        $scope.song.loved = false;
      }
    });

    $scope.previous = function () {
      audioPlayerSrv.previous();
    };

    $scope.next = function () {
      audioPlayerSrv.next();
    };

    $scope.togglePlay = function () {
      if ($scope.isPlaying) {
        audioPlayerSrv.pause();
      } else {
        audioPlayerSrv.play();
      }
    };

    $scope.toggleRepeat = function () {
      $scope.shouldRepeat = !$scope.shouldRepeat;
      audioPlayerSrv.toggleRepeat($scope.shouldRepeat);
    };

    $scope.toggleQueue = function () {
      $scope.shouldOpenQueue = !$scope.shouldOpenQueue;
      $scope.$broadcast('audioPlayerBar:toggleQueue', $scope.shouldOpenQueue);
    };

    $scope.toggleLoveStatus = function () {
      var lovedSongsGroup = songsGroupsMdl.get('loved');
      if ($scope.song.loved) {
        lovedSongsGroup.remove($scope.song);
      } else {
        lovedSongsGroup.add($scope.song);
      }
    };
  }

  AudioPlayerBarCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'songsGroupsMdl' ];

  return AudioPlayerBarCtrl;
});
