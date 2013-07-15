/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'angular-ui-utils-keypress',
    'angular-ui-bootstrap-collapse',
    'angular-ui-bootstrap-dropdownToggle',
    'components/song',
    'components/song-progress',
    'controllers',
    'services',
    'filters',
    'directives',
    'models'
], function (angular) {
    'use strict';
    
    return angular.module('soundrocket', [
        'ui.keypress',
        'ui.bootstrap.collapse',
        'ui.bootstrap.dropdownToggle',
        'soundrocket.components.song',
        'soundrocket.components.song-progress',
        'soundrocket.controllers',
        'soundrocket.services',
        'soundrocket.filters',
        'soundrocket.directives',
        'soundrocket.models'
    ]);
});
