/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchResultCtrl ($scope, $rootScope) {
        $scope.songs = [];
        
        $scope.$on('playqueue:search', function (event, result) {
            $scope.songs = result.songs;
        });
        
        $scope.play = function (event, song) {
            $rootScope.$broadcast('player:play', song);
        };
    }
    
    SearchResultCtrl.$inject = [ '$scope', '$rootScope' ];
    
    return SearchResultCtrl;
});
