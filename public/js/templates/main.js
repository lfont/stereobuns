/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './partials-tpls',
    './components-tpls',
    './angular-ui-tpls'
], function (angular,
             partialsTemplates,
             componentsTemplates,
             angularUiTemplates) {
    'use strict';
    
    return angular.module('soundrocket.templates', [
        partialsTemplates.name,
        componentsTemplates.name,
        angularUiTemplates.name
    ]);
});
