/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './directives/no-scroll-propagation-drt',
  './filters/time-flt'
], function (angular,
             noScrollPropagationDrtFactory,
             timeFltFactory) {
  'use strict';
  
  return angular.module('soundrocket.common', [])
                .directive('srNoScrollPropagation', noScrollPropagationDrtFactory)
                .filter('time', timeFltFactory);
});
