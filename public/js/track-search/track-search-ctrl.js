/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackSearchCtrl ($scope, $location) {
    $scope.query = '';

    $scope.search = function () {
      if ($scope.searchForm.$valid) {
        $location.path('/search').search({ q: $scope.query });
        $scope.query = '';
      }
    };
  }

  TrackSearchCtrl.$inject = [ '$scope', '$location' ];

  return TrackSearchCtrl;
});
