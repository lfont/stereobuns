/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function SettingsCtrl ($scope, userMdl) {
    userMdl.getInvitationCode().then(function (invitationCode) {
      $scope.invitationCode = invitationCode;
      $scope.hasInvitation = invitationCode !== null;
    });

    $scope.invitationCode = null;
    $scope.hasInvitation = false;
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
          $scope.invitationCode = null;
        });
    };
  }

  SettingsCtrl.$inject = [ '$scope', 'userMdl' ];

  return SettingsCtrl;
});
