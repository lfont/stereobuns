/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerCtrl ($scope, audioPlayerSrv) {
        $scope.song = null;
        $scope.progress = null;
        $scope.isPlaying = false;
        
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
        
        $scope.$on('audioPlayer:playlist', function (event, playlist) {
            alert('TODO');
        });
        
        $scope.$on('audioPlayer:playing', function (event, progress) {
            $scope.progress = progress;
        });
        
        $scope.showPlaylist = function () {
            alert('TODO');
        };
        
        $scope.previous = function () {
            audioPlayerSrv.previous();
        };
        
        $scope.togglePlay = function () {
            if ($scope.isPlaying) {
                audioPlayerSrv.pause();
            } else {
                audioPlayerSrv.play();
            }
        };
        
        $scope.next = function () {
            audioPlayerSrv.next();
        };
    }
    
    AudioPlayerCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return AudioPlayerCtrl;
});
