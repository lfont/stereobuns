/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'user',
  'track-group',
  'playlist',
  './user-profile-menu-ctrl',
  './user-profile-ctrl'
], function (angular,
             userModule,
             trackGroupModule,
             playlistModule,
             UserProfileMenuCtrl,
             UserProfileCtrl) {
  'use strict';

  var module = angular.module('soundrocket.user-profile', [
    userModule.name,
    trackGroupModule.name,
    playlistModule.name
  ]);
  
  module.controller('UserProfileMenuCtrl', UserProfileMenuCtrl)
        .controller('UserProfileCtrl', UserProfileCtrl);

  return module;
});
