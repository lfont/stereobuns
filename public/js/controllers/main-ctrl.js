/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function MainCtrl ($scope) {
        $scope.searchTemplateUrl = 'search.html';
    }
    
    MainCtrl.$inject = [ '$scope' ];
    
    return MainCtrl;
});
