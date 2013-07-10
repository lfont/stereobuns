/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './artwork-drt',
    './no-scroll-propagation-drt',
    './ui-scrollfix-drt'
], function (angular,
             artworkDrtFactory,
             noScrollPropagationDrtFactory,
             uiScrollfixDrtFactory) {
    'use strict';
    
    return angular.module('soundrocket.directives', [])
                  .directive('artwork', artworkDrtFactory)
                  .directive('noScrollPropagation', noScrollPropagationDrtFactory)
                  .directive('uiScrollfix', uiScrollfixDrtFactory);
});
