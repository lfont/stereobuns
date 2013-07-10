/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';

    function SongDrtCtrl ($scope, audioPlayerSrv, songsMdl) {
        var DEFAULT_OPTIONS = {
            queue: true
        };
        
        var currentSong = audioPlayerSrv.getCurrentSong();
        
        this.setOptions = function (options) {
            var opts = angular.extend({}, DEFAULT_OPTIONS, options);
            $scope.options = opts;
        };
        
        $scope.isPlaying = audioPlayerSrv.isPlaying();
        
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
        
        $scope.$on('songsStore:add', function (event, name, song) {
            if (name === 'Loved' &&
                $scope.song &&
                $scope.song.url === song.url &&
                !$scope.song.loved) {
                $scope.song.loved = true;
            }
        });
        
        $scope.$on('songsStore:remove', function (event, name, song) {
            if (name === 'Loved' &&
                $scope.song &&
                $scope.song.url === song.url &&
                $scope.song.loved) {
                $scope.song.loved = false;
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
            var lovedSongsStore = songsMdl.getSongsStore('loved');
            if ($scope.song.loved) {
                lovedSongsStore.remove($scope.song);
            } else {
                lovedSongsStore.add($scope.song);
            }
        };
    }
     
    SongDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'songsMdl' ];
    
    return SongDrtCtrl;
});
