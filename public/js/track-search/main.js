/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'common',
  './track-search-ctrl',
  './track-search-results-ctrl',
  './track-search-srv'
], function (angular,
             commonModule,
             TrackSearchCtrl,
             TrackSearchResultsCtrl,
             TrackSearchSrv) {
  'use strict';

  var module = angular.module('soundrocket.track-search', [
    commonModule.name  
  ]);
  
  module.controller('TrackSearchCtrl', TrackSearchCtrl)
        .controller('TrackSearchResultsCtrl', TrackSearchResultsCtrl)
        .service('trackSearchSrv', TrackSearchSrv);
        
  return module;
});
