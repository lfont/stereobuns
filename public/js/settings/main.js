/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'user',
  './settings-ctrl'
], function (angular,
             userModule,
             SettingsCtrl) {
  'use strict';
  
  var module = angular.module('soundrocket.settings', [
    userModule.name
  ]);
  
  module.controller('SettingsCtrl', SettingsCtrl);
  
  return module;
});
