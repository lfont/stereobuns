/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function AudioPlayerBarCtrl ($scope, audioPlayerSrv, trackGroupMdl) {

    function isCurrentSong (song) {
      return $scope.song &&
             song &&
             $scope.song.url === song.url;
    }

    function setStatus () {
      var status = audioPlayerSrv.getStatus();
      $scope.song = status.song;
      $scope.isPlaying = status.isPlaying;
    }

    $scope.song = null;
    $scope.isPlaying = null;
    $scope.shouldRepeat = false;
    $scope.shouldOpenQueue = false;

    $scope.$on('audioPlayer:play', function (event, loaded) {
      $scope.isPlaying = true;
      $scope.song = audioPlayerSrv.getStatus().track;
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

    $scope.$on('trackGroup:add', function (event, id, track) {
      if (id === 'loved' && isCurrentSong(track) && !$scope.song.loved) {
        $scope.song.loved = true;
      }
    });

    $scope.$on('trackGroup:remove', function (event, id, track) {
      if (id === 'loved' && isCurrentSong(track) && $scope.song.loved) {
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
      var lovedTrackGroup = trackGroupMdl.get('loved');
      if ($scope.song.loved) {
        lovedTrackGroup.remove($scope.song);
      } else {
        lovedTrackGroup.add($scope.song);
      }
    };

    setStatus();
  }

  AudioPlayerBarCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'trackGroupMdl' ];

  return AudioPlayerBarCtrl;
});
