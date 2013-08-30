/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './user-profile-drt-ctrl',
  './user-profile-drt',
  'models',
], function (angular,
             UserProfileDrtCtrl,
             userProfileDrtFactory) {
  'use strict';
  
  var component = angular.module('soundrocket.components.user-profile', [
    'soundrocket.models'
  ]);
  
  component.controller('UserProfileDrtCtrl', UserProfileDrtCtrl)
           .directive('userProfile', userProfileDrtFactory);
  
  return component;
});
