/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  './artwork-drt',
  './no-scroll-propagation-drt',
  './shortcut-drt'
], function (angular,
             artworkDrtFactory,
             noScrollPropagationDrtFactory,
             shortcutDrtFactory) {
  'use strict';

  return angular.module('soundrocket.directives', [])
                .directive('artwork', artworkDrtFactory)
                .directive('noScrollPropagation', noScrollPropagationDrtFactory)
                .directive('shortcut', shortcutDrtFactory);
});
