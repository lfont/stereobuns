/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function AudioPlayerQueueCtrl ($scope, audioPlayerSrv) {
    function loadSongs() {
      var promise = audioPlayerSrv.getQueue();
      promise.then(function (songs) {
        $scope.songs = songs;
      });
    }

    function close () {
      $scope.shouldBeOpen = false;
      $scope.songs.length = 0;
    }

    $scope.songs = [];
    $scope.shouldBeOpen = false;

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
