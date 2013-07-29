/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function LayoutCtrl ($scope) {
    $scope.searchBarTemplateUrl = '';
    $scope.userMenuTemplateUrl = '';
    $scope.audioPlayerBarTemplateUrl = '';
    $scope.hasBackground = false;

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      if (current.loadedTemplateUrl === 'partials/root.html') {
        $scope.searchBarTemplateUrl = '';
        $scope.userMenuTemplateUrl = '';
        $scope.audioPlayerBarTemplateUrl = '';
        $scope.hasBackground = true;
      } else {
        $scope.searchBarTemplateUrl = 'partials/search-bar.html';
        $scope.userMenuTemplateUrl = 'partials/user-menu.html';
        $scope.audioPlayerBarTemplateUrl = 'partials/audio-player-bar.html';
        $scope.hasBackground = false;
      }
    });
  }

  LayoutCtrl.$inject = [ '$scope' ];

  return LayoutCtrl;
});
