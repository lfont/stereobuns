/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  var SONGS_GROUP_ID_PATTERN = /^\/.+\/tracks\/(.*)/i,
      PLAYLIST_NAME_PATTERN  = /^\/.+\/playlist\/(.*)/i;

  function UserProfileMenuCtrl ($scope, $location, $routeParams,
                                trackGroupMdl, playlistsMdl) {
    var songsGroupIdMatchs = SONGS_GROUP_ID_PATTERN.exec($location.path()),
        playlistNameMatchs = PLAYLIST_NAME_PATTERN.exec($location.path());
    
    var isSongsGroup = songsGroupIdMatchs !== null;
    $scope.isPlaylist = playlistNameMatchs !== null;
    
    $scope.userName = $routeParams.user;
    $scope.songsGroups = trackGroupMdl.getAll();
    $scope.playlists = playlistsMdl.getAll();
    
    $scope.isCurrentSongsGroup = function (songsGroup) {
      if (isSongsGroup) {
        return songsGroupIdMatchs[1].toLowerCase() === songsGroup.id;
      }
      
      // default value
      return !$scope.isPlaylist && songsGroup.id === 'loved';
    };

    $scope.isCurrentPlaylist = function (playlist) {
      if ($scope.isPlaylist) {
        return playlistNameMatchs[1].toLowerCase() ===
               playlist.name.toLowerCase();
      }

      return false;
    };
  }
  
  UserProfileMenuCtrl.$inject = [ '$scope', '$location', '$routeParams',
                                  'trackGroupMdl', 'playlistsMdl' ];
  
  return UserProfileMenuCtrl;
});
