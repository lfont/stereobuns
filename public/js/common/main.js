/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './directives/artwork-drt',
  './directives/no-scroll-propagation-drt',
  './filters/time-flt',
  './filters/sentence-filter-flt',
  './filters/encode-flt',
  './services/cache-fct'
], function (angular,
             artworkDrtFactory,
             noScrollPropagationDrtFactory,
             timeFltFactory,
             sentenceFilterFltFactory,
             encodeFilterFactory,
             cacheFct) {
  'use strict';
  
  return angular.module('soundrocket.common', [])
                .directive('srArtwork', artworkDrtFactory)
                .directive('srNoScrollPropagation', noScrollPropagationDrtFactory)
                .filter('time', timeFltFactory)
                .filter('srSentenceFilter', sentenceFilterFltFactory)
                .filter('srEncode', encodeFilterFactory)
                .factory('cacheFactory', cacheFct);
});
