/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './track-search-ctrl',
  './track-search-results-ctrl',
  './track-search-srv',
  './track-flt'
], function (angular,
             TrackSearchCtrl,
             TrackSearchResultsCtrl,
             TrackSearchSrv,
             trackFltFactory) {
  'use strict';

  var module = angular.module('soundrocket.track-search', []);
  
  module.controller('TrackSearchCtrl', TrackSearchCtrl)
        .controller('TrackSearchResultsCtrl', TrackSearchResultsCtrl)
        .service('trackSearchSrv', TrackSearchSrv)
        .filter('track', trackFltFactory);
        
  return module;
});
