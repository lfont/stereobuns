/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerQueueCtrl ($scope) {
        $scope.songs = [];
        $scope.length = 0;
        
        $scope.modalOpts = {
            backdrop: true,
            keyboard: true,
            backdropClick: true
        };
        
        $scope.$on('audioPlayerQueue:open', function (event) {
            $scope.shouldBeOpen = true;
        });
        
        $scope.$on('audioPlayerQueue:songs', function (event, songs) {
            $scope.songs = songs;
            $scope.length = songs.length;
        });
        
        $scope.close = function () {
            $scope.shouldBeOpen = false;
        };
    }
    
    AudioPlayerQueueCtrl.$inject = [ '$scope' ];
    
    return AudioPlayerQueueCtrl;
});
