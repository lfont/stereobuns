/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './track-group-ctrl',
  './track-group-srv',
  './track-group-mdl'
], function (angular,
             TrackGroupCtrl,
             TrackGroupSrv,
             TrackGroupMdl) {
  'use strict';

  var module = angular.module('soundrocket.track-group', []);
  
  module.controller('TrackGroupCtrl', TrackGroupCtrl)
        .service('trackGroupSrv', TrackGroupSrv)
        .service('trackGroupMdl', TrackGroupMdl);
        
  return module;
});
