/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './settings-ctrl'
], function (angular,
             SettingsCtrl) {
  'use strict';
  
  var module = angular.module('soundrocket.settings', [
    'soundrocket.models'
  ]);
  
  module.controller('SettingsCtrl', SettingsCtrl);
  
  return module;
});
