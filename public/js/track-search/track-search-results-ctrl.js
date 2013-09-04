/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackSearchResultsCtrl ($scope, $routeParams, $filter,
                                   trackSearchSrv) {
    var songFilter = $filter('track'),
        allTracks  = [];

    function search (description) {
      allTracks.length = 0;
      $scope.songs.length = 0;
      $scope.searchFilter = null;
      $scope.isSearching = true;
      $scope.hasResult = false;
      $scope.searchQuery = description;
      trackSearchSrv
        .find(description)
        .then(function (tracks) {
          allTracks = tracks;
          $scope.hasResult = allTracks.length > 0;
          $scope.songs = allTracks;
          $scope.isSearching = false;
        });
    }

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

  TrackSearchResultsCtrl.$inject = [ '$scope', '$routeParams',
                                     '$filter', 'trackSearchSrv' ];

  return TrackSearchResultsCtrl;
});
