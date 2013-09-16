/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TopAlbumsCtrl ($scope, $routeParams, artistInfoSrv) {
    $scope.albums = artistInfoSrv.getTopAlbums($routeParams.artist);
  }

  TopAlbumsCtrl.$inject = [ '$scope', '$routeParams', 'artistInfoSrv' ];

  return TopAlbumsCtrl;
});
