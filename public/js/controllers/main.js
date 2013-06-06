/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './main-ctrl',
    './search-ctrl'
], function (angular, MainCtrl, SearchCtrl) {
    'use strict';
    
    return angular.module('soundrocket.controllers', [])
                  .controller('MainCtrl', MainCtrl)
                  .controller('SearchCtrl', SearchCtrl);
});
