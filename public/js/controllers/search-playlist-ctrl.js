/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchResultCtrl ($scope, audioPlayerSrv) {
        $scope.songs = [];
        
        $scope.$on('playlist', function (event, playlist) {
            if (playlist.type === 'search') {
                $scope.songs = playlist.songs;
            }
        });
        
        $scope.play = function (song) {
            audioPlayerSrv.play(song);
        };
    }
    
    SearchResultCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return SearchResultCtrl;
});
