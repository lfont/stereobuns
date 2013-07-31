/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function AudioPlayerQueueCtrl ($scope, audioPlayerSrv) {
    function loadSongs() {
      $scope.songs = audioPlayerSrv.getQueue();
    }

    function close () {
      $scope.shouldBeOpen = false;
      $scope.songs.length = 0;
    }

    $scope.songs = null;
    $scope.shouldBeOpen = false;
    $scope.isLoaded = false;

    $scope.songsActionsOptions = {
      remove: true,
      play: false,
      queue: false,
      filterPlaylists: false
    };

    $scope.songOptions = {
      queue: false,
      remove: true
    };

    $scope.$on('audioPlayer:queue', function (event) {
      if ($scope.shouldBeOpen) {
        loadSongs();
      }
    });

    $scope.$on('audioPlayer:dequeue', function (event) {
      if ($scope.shouldBeOpen) {
        loadSongs();
      }
    });

    $scope.$on('audioPlayerBar:toggleQueue', function (event, shouldBeOpen) {
      if (!shouldBeOpen) {
        close();
      } else {
        $scope.shouldBeOpen = true;
        $scope.isLoaded = true;
        loadSongs();
      }
    });

    $scope.dequeue = function (songs) {
      audioPlayerSrv.dequeue(songs);
    };

    $scope.close = function () {
      close();
      $scope.$emit('audioPlayerQueue:close');
    };
  }

  AudioPlayerQueueCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];

  return AudioPlayerQueueCtrl;
});
