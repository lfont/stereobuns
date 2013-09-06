/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'user',
  './layout-ctrl'
], function (angular,
             userModule,
             LayoutCtrl) {
  'use strict';

  return angular.module('soundrocket.layout', [ userModule.name ])
                .controller('LayoutCtrl', LayoutCtrl);
});
