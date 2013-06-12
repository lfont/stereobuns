/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'angular-ui-utils-keypress',
    'angular-ui-bootstrap-collapse',
    'angular-ui-bootstrap-dialog',
    'controllers',
    'services',
    'filters'
], function (angular) {
    'use strict';
    
    return angular.module('soundrocket', [
        'ui.keypress',
        'ui.bootstrap.collapse',
        'ui.bootstrap.dialog',
        'soundrocket.controllers',
        'soundrocket.services',
        'soundrocket.filters'
    ]);
});
