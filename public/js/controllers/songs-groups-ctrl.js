/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsGroupsCtrl ($scope, $location, songsGroupsMdl) {
    $scope.songsGroups = songsGroupsMdl.getAll();

    $scope.isCurrentSongsGroup = function (songsGroup) {
      var songsGroupIdPattern = /^\/songs\/(.*)/,
          matchs = songsGroupIdPattern.exec($location.path());

      return matchs &&
             matchs[1].toLowerCase() === songsGroup.id;
    };
  }

  SongsGroupsCtrl.$inject = [ '$scope', '$location', 'songsGroupsMdl' ];

  return SongsGroupsCtrl;
});
