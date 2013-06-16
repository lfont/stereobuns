/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchResultCtrl ($scope) {
        $scope.songs = [];
        
        $scope.$on('playlist', function (event, playlist) {
            if (playlist.type === 'search') {
                $scope.songs = playlist.songs;
            }
        });
    }
    
    SearchResultCtrl.$inject = [ '$scope' ];
    
    return SearchResultCtrl;
});
