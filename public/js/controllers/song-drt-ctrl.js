/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';

    function SongDrtCtrl ($scope, audioPlayerSrv, playlistSrv) {
        var DEFAULT_OPTIONS = {
            queue: true
        };
        
        var currentSong = audioPlayerSrv.getCurrentSong(),
            lovedPlaylistStore = playlistSrv.getPlaylist('Loved');
        
        function shouldUpdateLoveStatus (storeName, song) {
            return storeName === 'Loved' &&
                   $scope.song &&
                   $scope.song.url === song.url;
        }
        
        this.setOptions = function (options) {
            var opts = angular.extend({}, DEFAULT_OPTIONS, options);
            $scope.options = opts;
        };
        
        $scope.isPlaying = audioPlayerSrv.isPlaying();
        $scope.isLoved = lovedPlaylistStore.contains($scope.song);
        
        $scope.$on('audioPlayer:play', function (event, song) {
            currentSong = song;
            $scope.isPlaying = true;
        });
        
        $scope.$on('audioPlayer:stop', function (event) {
            currentSong = null;
            $scope.isPlaying = false;
        });
        
        $scope.$on('audioPlayer:pause', function (event) {
            $scope.isPlaying = false;
        });
        
        $scope.$on('audioPlayer:resume', function (event) {
            $scope.isPlaying = true;
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
        
        $scope.isCurrent = function () {
            return $scope.song === currentSong;
        };

        $scope.play = function () {
            if ($scope.isCurrent()) {
                audioPlayerSrv.play();
            } else {
                audioPlayerSrv.play($scope.song);
            }
        };
        
        $scope.queue = function () {
            audioPlayerSrv.enqueue($scope.song);
        };
        
        $scope.toggleLoveStatus = function () {
            if ($scope.isLoved) {
                lovedPlaylistStore.remove($scope.song);
            } else {
                lovedPlaylistStore.add($scope.song);
            }
        };
    }
     
    SongDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'playlistSrv' ];
    
    return SongDrtCtrl;
});
