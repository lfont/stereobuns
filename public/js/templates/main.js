/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './partials-tpls',
    './components-tpls'
], function (angular,
             partialsTemplates,
             componentsTemplates) {
    'use strict';

    return angular.module('soundrocket.templates', [
        partialsTemplates.name,
        componentsTemplates.name
    ]);
});
