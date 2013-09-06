/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './layout-ctrl',
  './playlist-ctrl',
  './songs-group-ctrl',
  './user-menu-ctrl',
  './user-profile-ctrl',
  './user-profile-menu-ctrl'
], function (angular,
             LayoutCtrl,
             PlaylistCtrl,
             SongsGroupCtrl,
             UserMenuCtrl,
             UserProfileCtrl,
             UserProfileMenuCtrl) {
  'use strict';

  return angular.module('soundrocket.controllers', [])
                .controller('LayoutCtrl', LayoutCtrl)
                .controller('PlaylistCtrl', PlaylistCtrl)
                .controller('SongsGroupCtrl', SongsGroupCtrl)
                .controller('UserMenuCtrl', UserMenuCtrl)
                .controller('UserProfileCtrl', UserProfileCtrl)
                .controller('UserProfileMenuCtrl', UserProfileMenuCtrl);
});
