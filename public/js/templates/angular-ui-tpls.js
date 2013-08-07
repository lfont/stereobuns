/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'text!angular-ui-bootstrap-template/dialog/message.html',
  'text!angular-ui-bootstrap-template/alert/alert.html'
], function (angular,
             dialogMessageTemplate,
             alertTemplate) {
  'use strict';

  var angularUiTemplateModule = angular.module('soundrocket.templates.angular-ui', []);

  angularUiTemplateModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/dialog/message.html', dialogMessageTemplate);
    $templateCache.put('template/alert/alert.html', alertTemplate);
  }]);

  return angularUiTemplateModule;
});
