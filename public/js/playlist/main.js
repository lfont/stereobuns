/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'user',
  'common',
  './playlist-ctrl',
  './empty-playlist-ctrl',
  './playlist-srv',
  './playlist-mdl',
  './chooser/playlist-chooser-ctrl',
  './chooser/playlist-chooser-drt',
  'angular-sanitize'
], function (angular,
             userModule,
             commonModule,
             PlaylistCtrl,
             EmptyPlaylistCtrl,
             PlaylistSrv,
             PlaylistMdl,
             PlaylistChooserCtrl,
             playlistChooserDrtFactory) {
  'use strict';

  var module = angular.module('soundrocket.playlist', [
    'ngSanitize',
    userModule.name,
    commonModule.name
  ]);

  module.controller('PlaylistCtrl', PlaylistCtrl)
        .controller('EmptyPlaylistCtrl', EmptyPlaylistCtrl)
        .service('playlistSrv', PlaylistSrv)
        .service('playlistMdl', PlaylistMdl)
        .controller('PlaylistChooserCtrl', PlaylistChooserCtrl)
        .directive('srPlaylistChooser', playlistChooserDrtFactory);

  return module;
});
