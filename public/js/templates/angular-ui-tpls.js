/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'text!angular-ui-bootstrap-template/dialog/message.html'
], function (angular,
             dialogMessageTemplate) {
  'use strict';

  var angularUiTemplateModule = angular.module('soundrocket.templates.angular-ui', []);

  angularUiTemplateModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/dialog/message.html', dialogMessageTemplate);
  }]);

  return angularUiTemplateModule;
});
