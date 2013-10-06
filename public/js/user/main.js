/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'track-group',
  'playlist',
  './user-profile-menu-ctrl',
  './user-profile-ctrl',
  './user-menu-ctrl',
  './user-srv',
  'angular-cookies'
], function (angular,
             trackGroupModule,
             playlistModule,
             UserProfileMenuCtrl,
             UserProfileCtrl,
             UserMenuCtrl,
             UserSrv) {
  'use strict';

  var module = angular.module('soundrocket.user', [
    'ngCookies',
    trackGroupModule.name,
    playlistModule.name
  ]);
  
  module.controller('UserProfileMenuCtrl', UserProfileMenuCtrl)
        .controller('UserProfileCtrl', UserProfileCtrl)
        .controller('UserMenuCtrl', UserMenuCtrl)
        .service('userSrv', UserSrv);

  return module;
});
