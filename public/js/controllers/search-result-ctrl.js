/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchResultCtrl ($scope) {
        $scope.songs = [];
        
        $scope.$on('playqueue:search', function (event, result) {
            event.stopPropagation();
            $scope.songs = result.songs;
        });
    }
    
    SearchResultCtrl.$inject = [ '$scope' ];
    
    return SearchResultCtrl;
});
