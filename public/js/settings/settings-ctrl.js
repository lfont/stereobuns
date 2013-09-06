/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function SettingsCtrl ($scope, $dialog, $location, userMdl) {
    $scope.hasInvitation = userMdl.hasInvitation();
    $scope.invitationCode = '';
    $scope.error = null;

    $scope.closeErrorAlert = function () {
      $scope.error = null;
    };

    $scope.setInvitationCode = function () {
      if (!$scope.invitationForm.$valid) {
        return $scope.invitationForm.$setDirty();
      }

      $scope.closeErrorAlert();

      userMdl
        .setInvitationCode($scope.invitationCode)
        .then(function () {
          $scope.hasInvitation = true;
        }, function (error) {
          $scope.error = error;
          $scope.invitationCode = '';
        });
    };

    $scope.openDeleteConfirmationBox = function () {
      $scope.closeErrorAlert();

      $dialog.messageBox(
        'Account Deletion',
        'All your playlist will be deleted.',
        [
          { label: 'Cancel', result: false },
          { label: 'Delete', result: true, cssClass: 'btn-danger' }
        ])
        .open()
        .then(function (confirmed) {
          if (!confirmed) {
            return;
          }

          userMdl
            .delete()
            .then(function () {
              $location.path('/');
            }, function (error) {
              $scope.error = error;
            });
        });
    };
  }

  SettingsCtrl.$inject = [ '$scope', '$dialog', '$location', 'userMdl' ];

  return SettingsCtrl;
});
