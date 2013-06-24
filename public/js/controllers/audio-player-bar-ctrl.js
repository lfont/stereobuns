/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerBarCtrl ($scope, audioPlayerSrv) {
        $scope.audioPlayerQueueTemplate = 'audio-player-queue.html';
        $scope.song = null;
        $scope.progress = null;
        $scope.isPlaying = false;
        $scope.shouldRepeat = false;
        $scope.shouldOpenQueue = false;
        
        $scope.$on('audioPlayer:play', function (event, song) {
            $scope.isPlaying = true;
            $scope.song = song;
        });
        
        $scope.$on('audioPlayer:pause', function (event) {
            $scope.isPlaying = false;
        });
        
        $scope.$on('audioPlayer:resume', function (event) {
            $scope.isPlaying = true;
        });
        
        $scope.$on('audioPlayer:stop', function (event) {
            $scope.isPlaying = false;
            $scope.song = null;
        });
        
        $scope.$on('audioPlayer:playing', function (event, progress) {
            $scope.progress = progress;
        });
        
        $scope.$on('audioPlayerQueue:close', function (event) {
            $scope.shouldOpenQueue = false;
        });
        
        $scope.previous = function () {
            audioPlayerSrv.previous();
        };
        
        $scope.next = function () {
            audioPlayerSrv.next();
        };
        
        $scope.togglePlay = function () {
            if ($scope.isPlaying) {
                audioPlayerSrv.pause();
            } else {
                audioPlayerSrv.play();
            }
        };
        
        $scope.toggleRepeat = function () {
            $scope.shouldRepeat = !$scope.shouldRepeat;
            audioPlayerSrv.toggleRepeat($scope.shouldRepeat);
        };
        
        $scope.toggleQueue = function () {
            $scope.shouldOpenQueue = !$scope.shouldOpenQueue;
            $scope.$broadcast('audioPlayerBar:toggleQueue', $scope.shouldOpenQueue);
        };
    }
    
    AudioPlayerBarCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return AudioPlayerBarCtrl;
});
