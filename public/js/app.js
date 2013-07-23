/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'components/song',
  'components/song-progress',
  'controllers',
  'services',
  'filters',
  'directives',
  'models'
], function (angular) {
  'use strict';

  var soundRocket = angular.module('soundrocket', [
    'soundrocket.components.song',
    'soundrocket.components.song-progress',
    'soundrocket.controllers',
    'soundrocket.services',
    'soundrocket.filters',
    'soundrocket.directives',
    'soundrocket.models'
  ]);

  soundRocket.constant('config', { debug: false });

  return soundRocket;
});
