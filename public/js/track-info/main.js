/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'track-search',
  './track-info-ctrl',
  './track-info-srv'
], function (angular,
             trackSearchModule,
             TrackInfoCtrl,
             TrackInfoSrv) {
  'use strict';

  var module = angular.module('soundrocket.track-info', [
    trackSearchModule.name
  ]);
  
  module.controller('TrackInfoCtrl', TrackInfoCtrl)
        .service('trackInfoSrv', TrackInfoSrv);
        
  return module;
});
