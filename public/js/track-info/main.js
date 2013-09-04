/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './track-info-ctrl',
  './track-info-srv'
], function (angular,
             TrackInfoCtrl,
             TrackInfoSrv) {
  'use strict';

  var module = angular.module('soundrocket.track-info', [
    'soundrocket.track-search'
  ]);
  
  module.controller('TrackInfoCtrl', TrackInfoCtrl)
        .service('trackInfoSrv', TrackInfoSrv);
        
  return module;
});
