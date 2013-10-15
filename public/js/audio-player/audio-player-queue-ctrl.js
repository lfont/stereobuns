/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function AudioPlayerQueueCtrl ($scope, audioPlayerSrv) {
    
    function loadTracks() {
      audioPlayerSrv
        .getQueue()
        .then(function (tracks) {
          $scope.songs = tracks;
        });
    }

    function close () {
      $scope.shouldBeOpen = false;
      $scope.songs.length = 0;
    }

    $scope.songs = null;
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
        loadTracks();
      }
    });

    $scope.$on('audioPlayer:dequeue', function (event) {
      if ($scope.shouldBeOpen) {
        loadTracks();
      }
    });

    $scope.$on('audioPlayerBar:toggleQueue', function (event, shouldBeOpen) {
      if (!shouldBeOpen) {
        close();
      } else {
        $scope.shouldBeOpen = true;
        loadTracks();
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
