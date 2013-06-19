/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchBarCtrl ($scope, $location) {
        $scope.query = '';
        
        $scope.search = function () {
            $location.path('/search').search({ q: $scope.query });
            $scope.query = '';
        };
    }
    
    SearchBarCtrl.$inject = [ '$scope', '$location' ];
    
    return SearchBarCtrl;
});
