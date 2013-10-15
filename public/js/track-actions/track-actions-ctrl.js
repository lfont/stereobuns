/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function TrackActionsCtrl ($scope, audioPlayerSrv, trackGroupMdl) {
    var DEFAULT_OPTIONS = {
      remove: false,
      play: false,
      queue: true,
      playlists: true,
      filterPlaylists: true,
      loved: true
    };

    $scope.playlistsOptions = {
      filter: DEFAULT_OPTIONS.filterPlaylists
    };

    $scope.options = angular.extend({}, DEFAULT_OPTIONS, $scope.customOptions);
    $scope.playlistsOptions.filter = $scope.options.filterPlaylists;
    $scope.isMulti = false;
    $scope.shouldBeVisible = false;

    $scope.$watchCollection('tracks', function (newTracks, oldTracks) {
      $scope.isMulti = angular.isArray(newTracks);
      $scope.shouldBeVisible = $scope.isMulti ?
        newTracks.length !== 0 :
        angular.isDefined(newTracks) && newTracks !== null;
    });
    
    $scope.$on('trackGroup:add', function (event, id, track) {
      if (id === 'loved' && track.url === $scope.tracks.url) {
        $scope.tracks.loved = true;
      }
    });

    $scope.$on('trackGroup:remove', function (event, id, track) {
      if (id === 'loved' && track.url === $scope.tracks.url) {
        $scope.tracks.loved = false;
      }
    });

    $scope.play = function () {
      var promise = audioPlayerSrv.enqueue($scope.tracks);
      promise.then(function () {
        audioPlayerSrv.play($scope.isMulti ? $scope.tracks[0] : $scope.tracks);
      });
    };

    $scope.queue = function () {
      audioPlayerSrv.enqueue($scope.tracks);
    };

    $scope.toggleLove = function () {
      var lovedSongsGroup = trackGroupMdl.get('loved');
      if ($scope.tracks.loved) {
        lovedSongsGroup.remove($scope.tracks);
      } else {
        lovedSongsGroup.add($scope.tracks);
      }
    };

    $scope.remove = function () {
      $scope.onRemove({ tracks: $scope.tracks });
    };
  }

  TrackActionsCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'trackGroupMdl' ];

  return TrackActionsCtrl;
});
