/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerQueueCtrl ($scope, audioPlayerSrv) {
        $scope.queue = audioPlayerSrv.getQueue();
        
        $scope.songsActionsOptions = {
            remove: true,
            play: false,
            queue: false,
            filterPlaylists: false
        };
        
        $scope.songOptions = {
            queue: false,
            remove: true
        };
        
        $scope.$on('audioPlayerBar:toggleQueue', function (event, shouldBeOpen) {
            $scope.shouldBeOpen = shouldBeOpen;
        });
        
        $scope.dequeue = function (songs) {
            audioPlayerSrv.dequeue(songs);
        };
        
        $scope.close = function () {
            $scope.shouldBeOpen = false;
            $scope.$emit('audioPlayerQueue:close');
        };
    }
    
    AudioPlayerQueueCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return AudioPlayerQueueCtrl;
});
