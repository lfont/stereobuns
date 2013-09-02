/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function LayoutCtrl ($scope, userMdl) {
    $scope.searchBarTemplateUrl = null;
    $scope.userMenuTemplateUrl = null;
    $scope.audioPlayerBarTemplateUrl = null;
    $scope.hasBackground = false;

    $scope.$on('userMdl:invitation', function (event) {
      $scope.searchBarTemplateUrl = 'partials/search-bar.html';
      $scope.audioPlayerBarTemplateUrl = 'partials/audio-player-bar.html';
    });

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      var hasInvitation = userMdl.hasInvitation();
      
      if (current.loadedTemplateUrl === 'partials/root.html') {
        $scope.searchBarTemplateUrl = null;
        $scope.userMenuTemplateUrl = null;
        $scope.audioPlayerBarTemplateUrl = null;
        $scope.hasBackground = true;
      } else {
        $scope.searchBarTemplateUrl = hasInvitation ? 'partials/search-bar.html' : '';
        $scope.userMenuTemplateUrl = 'partials/user-menu.html';
        $scope.audioPlayerBarTemplateUrl = hasInvitation ? 'partials/audio-player-bar.html' : '';
        $scope.hasBackground = false;
      }
    });
  }

  LayoutCtrl.$inject = [ '$scope', 'userMdl' ];

  return LayoutCtrl;
});
