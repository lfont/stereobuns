/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerCtrl ($scope, $dialog, audioPlayerSrv) {
        var queueDialog = $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl: 'audio-player-queue.html',
            controller: 'AudioPlayerQueueCtrl',
            resolve: {
                player: function () {
                    return $scope;
                }
            }
        });
        
        function refreshQueueDialog () {
            if (queueDialog.isOpen()) {
                // force the refresh of the dialog
                queueDialog.open();
            }
        }
        
        $scope.songs = [];
        $scope.song = null;
        $scope.progress = null;
        $scope.isPlaying = false;
        
        $scope.$on('audioPlayer:play', function (event, song) {
            $scope.isPlaying = true;
            $scope.song = song;
            refreshQueueDialog();
        });
        
        $scope.$on('audioPlayer:pause', function (event) {
            $scope.isPlaying = false;
            refreshQueueDialog();
        });
        
        $scope.$on('audioPlayer:resume', function (event) {
            $scope.isPlaying = true;
            refreshQueueDialog();
        });
        
        $scope.$on('audioPlayer:stop', function (event) {
            $scope.isPlaying = false;
            $scope.song = null;
            refreshQueueDialog();
        });
        
        $scope.$on('audioPlayer:playing', function (event, progress) {
            $scope.progress = progress;
        });
             
        $scope.$on('audioPlayer:clearQueue', function (event) {
            $scope.songs.length = 0;
            refreshQueueDialog();
        });
        
        $scope.$on('audioPlayer:enqueue', function (event, songs) {
            $scope.songs = $scope.songs.concat(songs);
            refreshQueueDialog();
        });
        
        $scope.showQueue = function () {
            queueDialog.open();
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
    
    AudioPlayerCtrl.$inject = [ '$scope', '$dialog', 'audioPlayerSrv' ];
    
    return AudioPlayerCtrl;
});
