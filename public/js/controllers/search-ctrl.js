/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope) {
        $scope.query = 'hello';
    }
    
    SearchCtrl.$inject = [ '$scope' ];
    
    return SearchCtrl;
});
