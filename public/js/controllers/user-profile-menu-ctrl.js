/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function UserProfileMenuCtrl ($scope, $location, $routeParams,
                                songsGroupsMdl, playlistsMdl) {
    $scope.userName = $routeParams.user;
    $scope.isPlaylist = false;
    $scope.songsGroups = songsGroupsMdl.getAll();
    $scope.playlists = playlistsMdl.getAll();
    
    $scope.isCurrentSongsGroup = function (songsGroup) {
      var songsGroupIdPattern = /^\/.+\/tracks\/(.*)/i,
          matchs = songsGroupIdPattern.exec($location.path());

      return matchs &&
             matchs[1].toLowerCase() === songsGroup.id;
    };

    $scope.isCurrentPlaylist = function (playlist) {
      var playlistNamePattern = /^\/.+\/playlist\/(.*)/i,
          matchs = playlistNamePattern.exec($location.path());

      if (matchs) {
        $scope.isPlaylist = true;
        return matchs[1].toLowerCase() === playlist.name.toLowerCase();
      }

      return false;
    };
  }
  
  UserProfileMenuCtrl.$inject = [ '$scope', '$location', '$routeParams',
                                     'songsGroupsMdl', 'playlistsMdl' ];
  
  return UserProfileMenuCtrl;
});
