/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsGroupsCtrl ($scope, $location, userMdl, songsGroupsMdl) {
    $scope.userName = userMdl.getName();
    $scope.songsGroups = songsGroupsMdl.getAll();

    $scope.isCurrentSongsGroup = function (songsGroup) {
      var songsGroupIdPattern = /^\/.+\/tracks\/(.*)/i,
          matchs = songsGroupIdPattern.exec($location.path());

      return matchs &&
             matchs[1].toLowerCase() === songsGroup.id;
    };
  }

  SongsGroupsCtrl.$inject = [ '$scope', '$location',
                              'userMdl', 'songsGroupsMdl' ];

  return SongsGroupsCtrl;
});
