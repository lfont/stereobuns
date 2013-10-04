/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackSearchResultsCtrl ($scope, $routeParams, trackSearchSrv,
                                   srSentenceFilterFilter) {

    function search (description) {
      $scope.searchQuery = description;
      $scope.tracks.length = 0;
      $scope.filteredTracks.length = 0;
      $scope.isSearching = true;
      $scope.filter = null;
      
      trackSearchSrv
        .find(description)
        .then(function (tracks) {
          $scope.tracks = tracks;
          $scope.isSearching = false;
          $scope.filterBy();
        });
    }

    $scope.searchQuery = null;
    $scope.tracks = [];
    $scope.filteredTracks = [];
    $scope.isSearching = false;
    $scope.filter = null;
    
    $scope.filterBy = function (property) {
      $scope.filter = property;
      $scope.filteredTracks = srSentenceFilterFilter($scope.tracks,
                                                     $scope.filter,
                                                     $scope.searchQuery);
    };

    search($routeParams.q);
  }

  TrackSearchResultsCtrl.$inject = [ '$scope', '$routeParams',
                                     'trackSearchSrv', 'srSentenceFilterFilter' ];

  return TrackSearchResultsCtrl;
});
