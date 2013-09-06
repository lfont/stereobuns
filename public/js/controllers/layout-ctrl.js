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
      $scope.searchBarTemplateUrl = 'templates/track-search/track-search.html';
      $scope.audioPlayerBarTemplateUrl = 'templates/audio-player/audio-player.html';
    });

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      var hasInvitation = userMdl.hasInvitation();
      
      if (current.loadedTemplateUrl === 'templates/root.html') {
        $scope.searchBarTemplateUrl = null;
        $scope.userMenuTemplateUrl = null;
        $scope.audioPlayerBarTemplateUrl = null;
        $scope.hasBackground = true;
      } else {
        $scope.searchBarTemplateUrl = hasInvitation ? 'templates/track-search/track-search.html' : '';
        $scope.userMenuTemplateUrl = 'templates/user-menu.html';
        $scope.audioPlayerBarTemplateUrl = hasInvitation ? 'templates/audio-player/audio-player.html' : '';
        $scope.hasBackground = false;
      }
    });
  }

  LayoutCtrl.$inject = [ '$scope', 'userMdl' ];

  return LayoutCtrl;
});
