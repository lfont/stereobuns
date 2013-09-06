/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './home-ctrl'
], function (angular,
             HomeCtrl) {
  'use strict';
  
  var module = angular.module('soundrocket.home', [
    'soundrocket.models'
  ]);
  
  module.controller('HomeCtrl', HomeCtrl);
  
  return module;
});
