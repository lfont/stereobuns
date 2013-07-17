/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsStatusCtrl ($scope, $location, songsMdl) {
    function loadSongsStores () {
      $scope.songsStores = songsMdl.getSongsStores();
    }

    $scope.songsStores = [];

    $scope.isCurrentSongsStore = function (songsStore) {
      var songsStoreIdPattern = /^\/songs\/(.*)/,
          matchs = songsStoreIdPattern.exec($location.path());

      return matchs &&
             matchs[1].toLowerCase() === songsStore.id;
    };

    loadSongsStores();
  }

  SongsStatusCtrl.$inject = [ '$scope', '$location', 'songsMdl' ];

  return SongsStatusCtrl;
});
