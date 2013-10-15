/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'user',
  './track-group-ctrl',
  './empty-group-ctrl',
  './track-group-srv',
  './track-group-mdl',
  'angular-sanitize'
], function (angular,
             userModule,
             TrackGroupCtrl,
             EmptyGroupCtrl,
             TrackGroupSrv,
             TrackGroupMdl) {
  'use strict';

  var module = angular.module('soundrocket.track-group', [
    'ngSanitize',
    userModule.name
  ]);
  
  module.controller('TrackGroupCtrl', TrackGroupCtrl)
        .controller('EmptyGroupCtrl', EmptyGroupCtrl)
        .service('trackGroupSrv', TrackGroupSrv)
        .service('trackGroupMdl', TrackGroupMdl);
        
  return module;
});
