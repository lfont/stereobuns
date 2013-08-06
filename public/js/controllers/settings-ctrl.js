/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function SettingsCtrl ($scope, userMdl) {
    $scope.hasInvitation = userMdl.hasInvitation();
    $scope.invitationCode = '';
    $scope.error = null;

    $scope.setInvitationCode = function () {
      if (!$scope.invitationForm.$valid) {
        return $scope.invitationForm.$setDirty();
      }

      $scope.error = null;

      userMdl
        .setInvitationCode($scope.invitationCode)
        .then(function () {
          $scope.hasInvitation = true;
        }, function (error) {
          $scope.error = error;
          $scope.invitationCode = '';
        });
    };
  }

  SettingsCtrl.$inject = [ '$scope', 'userMdl' ];

  return SettingsCtrl;
});
