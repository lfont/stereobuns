/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'user',
  './home-ctrl'
], function (angular,
             userModule,
             HomeCtrl) {
  'use strict';
  
  var module = angular.module('soundrocket.home', [
    userModule.name
  ]);
  
  module.controller('HomeCtrl', HomeCtrl);
  
  return module;
});
