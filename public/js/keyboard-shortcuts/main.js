/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './keyboard-shortcuts-ctrl',
  './keyboard-shortcut-drt'
], function (angular,
             KeyboardShortcutsCtrl,
             keyboardShortcutDrtFactory) {
  'use strict';
  
  return angular.module('soundrocket.keyboard-shortcuts', [])
                .controller('KeyboardShortcutsCtrl', KeyboardShortcutsCtrl)
                .directive('srKeyboardShortcut', keyboardShortcutDrtFactory);
});
