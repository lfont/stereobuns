/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function SongsActionsDrtCtrl ($scope, audioPlayerSrv, songsGroupsMdl) {
    var DEFAULT_OPTIONS = {
      remove: false,
      play: false,
      queue: true,
      playlists: true,
      filterPlaylists: true
    };

    function setOptions () {
      $scope.options = angular.extend({}, DEFAULT_OPTIONS, $scope.customOptions);
      $scope.playlistsOptions.filter = $scope.options.filterPlaylists;
    }

    $scope.playlistsOptions = {
      filter: DEFAULT_OPTIONS.filterPlaylists
    };

    $scope.isMulti = false;
    $scope.shouldBeVisible = false;

    $scope.$watchCollection('songs', function (newSongs, oldSongs) {
      $scope.isMulti = angular.isArray(newSongs);
      $scope.shouldBeVisible = $scope.isMulti ?
        newSongs.length !== 0 :
        angular.isDefined(newSongs) && newSongs !== null;
    });

    $scope.play = function () {
      var promise = audioPlayerSrv.enqueue($scope.songs);
      promise.then(function () {
        audioPlayerSrv.play($scope.isMulti ? $scope.songs[0] : $scope.songs);
      });
    };

    $scope.queue = function () {
      audioPlayerSrv.enqueue($scope.songs);
    };

    $scope.toggleLove = function () {
      var lovedSongsGroup = songsGroupsMdl.get('loved');
      if ($scope.songs.loved) {
        lovedSongsGroup.remove($scope.songs);
      } else {
        lovedSongsGroup.add($scope.songs);
      }
    };

    $scope.remove = function () {
      $scope.onRemove({ songs: $scope.songs });
    };

    setOptions();
  }

  SongsActionsDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'songsGroupsMdl' ];

  return SongsActionsDrtCtrl;
});
