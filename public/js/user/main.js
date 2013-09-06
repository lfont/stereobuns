/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './user-profile-menu-ctrl',
  './user-profile-ctrl',
  './user-menu-ctrl',
  './user-srv',
  'angular-cookies'
], function (angular,
             UserProfileMenuCtrl,
             UserProfileCtrl,
             UserMenuCtrl,
             UserSrv) {
  'use strict';

  var module = angular.module('soundrocket.user', [
    'ngCookies',
    'soundrocket.models'
  ]);
  
  module.controller('UserProfileMenuCtrl', UserProfileMenuCtrl)
        .controller('UserProfileCtrl', UserProfileCtrl)
        .controller('UserMenuCtrl', UserMenuCtrl)
        .service('userSrv', UserSrv);

  return module;
});
