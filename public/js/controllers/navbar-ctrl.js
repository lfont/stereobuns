/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function NavBarCtrl ($scope) {
        $scope.searchTemplateUrl = 'search.html';
    }
    
    NavBarCtrl.$inject = [ '$scope' ];
    
    return NavBarCtrl;
});
