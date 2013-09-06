/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function LayoutCtrl ($scope, userSrv) {
    $scope.searchBarTemplateUrl = null;
    $scope.userMenuTemplateUrl = null;
    $scope.audioPlayerBarTemplateUrl = null;
    $scope.backgroundClass = null;

    $scope.$on('userSrv:invitation', function (event) {
      $scope.searchBarTemplateUrl = 'templates/track-search/track-search.html';
      $scope.audioPlayerBarTemplateUrl = 'templates/audio-player/audio-player.html';
    });

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
      var hasInvitation = userSrv.hasInvitation();
      
      if (current.loadedTemplateUrl === 'templates/home/home.html') {
        $scope.searchBarTemplateUrl = null;
        $scope.userMenuTemplateUrl = null;
        $scope.audioPlayerBarTemplateUrl = null;
        $scope.backgroundClass = 'home-background';
      } else {
        $scope.searchBarTemplateUrl = hasInvitation ? 'templates/track-search/track-search.html' : '';
        $scope.userMenuTemplateUrl = 'templates/user/user-menu.html';
        $scope.audioPlayerBarTemplateUrl = hasInvitation ? 'templates/audio-player/audio-player.html' : '';
        $scope.backgroundClass = null;
      }
    });
  }

  LayoutCtrl.$inject = [ '$scope', 'userSrv' ];

  return LayoutCtrl;
});
