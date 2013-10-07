/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './user-menu-ctrl',
  './user-srv',
  'angular-cookies'
], function (angular,
             UserMenuCtrl,
             UserSrv) {
  'use strict';

  var module = angular.module('soundrocket.user', [
    'ngCookies'
  ]);
  
  module.controller('UserMenuCtrl', UserMenuCtrl)
        .service('userSrv', UserSrv);

  return module;
});
