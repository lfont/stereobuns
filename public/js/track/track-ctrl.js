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

    function isPlayerTrack () {
      var track = audioPlayerSrv.getStatus().track;
      return track &&
             $scope.track &&
             track.url === $scope.track.url;
    }

    $scope.isPlaying = false;

    $scope.$watch('track', function (newTrack, oldTrack) {
      $scope.isPlaying = isPlayerTrack() && audioPlayerSrv.getStatus().isPlaying;
    });

    $scope.$on('audioPlayer:play', function (event, loaded) {
      $scope.isPlaying = isPlayerTrack();
    });

    $scope.$on('audioPlayer:pause', function (event) {
      $scope.isPlaying = false;
    });

    $scope.$on('audioPlayer:resume', function (event) {
      $scope.isPlaying = isPlayerTrack();
    });

    $scope.$on('audioPlayer:stop', function (event) {
      $scope.isPlaying = false;
    });

    $scope.$on('trackGroup:add', function (event, id, track) {
      if (id === 'loved' && track.url === $scope.track.url && !$scope.track.loved) {
        $scope.track.loved = true;
      }
    });

    $scope.$on('trackGroup:remove', function (event, id, track) {
      if (id === 'loved' && track.url === $scope.track.url && $scope.track.loved) {
        $scope.track.loved = false;
      }
    });

    $scope.togglePlay = function () {
      if (isPlayerTrack()) {
        if (audioPlayerSrv.getStatus().isPlaying) {
          audioPlayerSrv.pause();
        } else {
          audioPlayerSrv.play();
        }
      } else {
        audioPlayerSrv.play($scope.track);
      }
    };

    $scope.remove = function (track) {
      $scope.onRemove({ track: track });
    };

    setOptions();
  }

  TrackCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];

  return TrackCtrl;
});
