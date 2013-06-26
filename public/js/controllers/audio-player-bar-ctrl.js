/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerBarCtrl ($scope, audioPlayerSrv, playlistSrv) {
        var lovedPlaylistStore = playlistSrv.getStore('Loved');
        
        function setSong (song) {
            $scope.song = song;
            $scope.isLoved = song ?
                lovedPlaylistStore.contains($scope.song) :
                false;
        }
        
        function shouldUpdateLoveStatus (storeName, song) {
            return storeName === 'Loved' &&
                   $scope.song &&
                   $scope.song.url === song.url;
        }
        
        $scope.audioPlayerQueueTemplate = 'audio-player-queue.html';
        $scope.song = null;
        $scope.isLoved = false;
        $scope.progress = null;
        $scope.isPlaying = false;
        $scope.shouldRepeat = false;
        $scope.shouldOpenQueue = false;
        
        $scope.$on('audioPlayer:play', function (event, song) {
            $scope.isPlaying = true;
            setSong(song);
        });
        
        $scope.$on('audioPlayer:pause', function (event) {
            $scope.isPlaying = false;
        });
        
        $scope.$on('audioPlayer:resume', function (event) {
            $scope.isPlaying = true;
        });
        
        $scope.$on('audioPlayer:stop', function (event) {
            $scope.isPlaying = false;
            setSong(null);
        });
        
        $scope.$on('audioPlayer:playing', function (event, progress) {
            $scope.progress = progress;
        });
        
        $scope.$on('audioPlayerQueue:close', function (event) {
            $scope.shouldOpenQueue = false;
        });
        
        $scope.$on('playlistStore:add', function (event, storeName, song) {
            if (shouldUpdateLoveStatus(storeName, song) &&
                !$scope.isLoved) {
                $scope.isLoved = true;
            }
        });
        
        $scope.$on('playlistStore:remove', function (event, storeName, song) {
            if (shouldUpdateLoveStatus(storeName, song) &&
                $scope.isLoved) {
                $scope.isLoved = false;
            }
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
        
        $scope.toggleLoveStatus = function () {
            if ($scope.isLoved) {
                lovedPlaylistStore.remove($scope.song);
            } else {
                lovedPlaylistStore.add($scope.song);
            }
        };
    }
    
    AudioPlayerBarCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'playlistSrv' ];
    
    return AudioPlayerBarCtrl;
});
