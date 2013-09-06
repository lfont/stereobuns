/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function UserMenuCtrl ($scope, $location, $dialog, userMdl) {
    var dialogIsOpen = false;

    $scope.user = userMdl.get();

    $scope.openKeyboardShortcuts = function () {
      if (dialogIsOpen) {
        return;
      }

      dialogIsOpen = true;
      $dialog.dialog({
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: 'templates/keyboard-shortcuts/keyboard-shortcuts.html',
        controller: 'KeyboardShortcutsCtrl'
      }).open().then(function () {
        dialogIsOpen = false;
      });
    };

    $scope.signOut = function () {
      userMdl
        .logout()
        .then(function () {
          $location.path('/');
        });
    };
  }

  UserMenuCtrl.$inject = [ '$scope', '$location', '$dialog', 'userMdl' ];

  return UserMenuCtrl;
});
