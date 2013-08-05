/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function KeyboardShortcutsCtrl ($scope, dialog) {

    $scope.close = function () {
      dialog.close();
    };
  }

  KeyboardShortcutsCtrl.$inject = [ '$scope', 'dialog' ];

  return KeyboardShortcutsCtrl;
});
