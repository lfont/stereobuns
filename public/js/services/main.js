/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './tomahawk-srv'
], function (angular, TomahawkSrvFactory) {
    'use strict';
    
    return angular.module('soundrocket.services', [], function ($provide) {
        $provide.factory('tomahawkSrv', TomahawkSrvFactory);
    });
});
