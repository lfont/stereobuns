/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'text!partials/keyboard-shortcuts.html'
], function (angular,
             keyboardShortcutsTemplate) {
  'use strict';

  var dialogTemplateModule = angular.module('soundrocket.templates.dialog', []);

  dialogTemplateModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('partials/keyboard-shortcuts.html', keyboardShortcutsTemplate);
  }]);

  return dialogTemplateModule;
});
