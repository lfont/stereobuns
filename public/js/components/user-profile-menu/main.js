/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './user-profile-menu-drt-ctrl',
  './user-profile-menu-drt',
  'models',
], function (angular,
             UserProfileMenuDrtCtrl,
             userProfileMenuDrtFactory) {
  'use strict';
  
  var component = angular.module('soundrocket.components.user-profile-menu', [
    'soundrocket.models'
  ]);
  
  component.controller('UserProfileMenuDrtCtrl', UserProfileMenuDrtCtrl)
           .directive('userProfileMenu', userProfileMenuDrtFactory);
  
  return component;
});
