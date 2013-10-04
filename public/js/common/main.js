/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './directives/artwork-drt',
  './directives/no-scroll-propagation-drt',
  './filters/time-flt',
  './filters/sentence-filter-flt'
], function (angular,
             artworkDrtFactory,
             noScrollPropagationDrtFactory,
             timeFltFactory,
             sentenceFilterFltFactory) {
  'use strict';
  
  return angular.module('soundrocket.common', [])
                .directive('srArtwork', artworkDrtFactory)
                .directive('srNoScrollPropagation', noScrollPropagationDrtFactory)
                .filter('time', timeFltFactory)
                .filter('srSentenceFilter', sentenceFilterFltFactory);
});
