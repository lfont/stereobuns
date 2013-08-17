/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SearchCtrl ($scope, $routeParams, $filter, tracksSearchSrv) {
    var songFilter = $filter('song'),
        allTracks  = [];

    function search (description) {
      allTracks.length = 0;
      $scope.songs.length = 0;
      $scope.searchFilter = null;
      $scope.isSearching = true;
      $scope.hasResult = false;
      $scope.searchQuery = description;
      tracksSearchSrv
        .find(description)
        .then(function (tracks) {
          allTracks = tracks;
          $scope.hasResult = allTracks.length > 0;
          $scope.songs = allTracks;
          $scope.isSearching = false;
        });
    }

    $scope.songsStatusTemplateUrl = 'partials/songs-groups.html';
    $scope.playlistsTemplateUrl = 'partials/playlists.html';
    $scope.isSearching = false;
    $scope.hasResult = false;
    $scope.searchFilter = null;
    $scope.songs = [];

    $scope.filterBy = function (property) {
      $scope.searchFilter = property;
      $scope.songs = songFilter(allTracks,
                                $scope.searchFilter,
                                $scope.searchQuery);
    };

    search($routeParams.q);
  }

  SearchCtrl.$inject = [ '$scope', '$routeParams', '$filter', 'tracksSearchSrv' ];

  return SearchCtrl;
});
