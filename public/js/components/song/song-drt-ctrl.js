/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';

    function SongDrtCtrl ($scope, audioPlayerSrv) {
        var DEFAULT_OPTIONS = {
            remove: false,
            queue: true
        };
        
        var currentSong = audioPlayerSrv.getCurrentSong(),
            isPlaying   = audioPlayerSrv.isPlaying();
        
        function isCurrentSong () {
            return $scope.song &&
                   currentSong &&
                   $scope.song.url === currentSong.url;
        }
        
        function setOptions () {
            $scope.options = angular.extend({}, DEFAULT_OPTIONS, $scope.customOptions);
        }
        
        $scope.$on('audioPlayer:play', function (event, song) {
            currentSong = song;
            isPlaying = true;
        });
        
        $scope.$on('audioPlayer:stop', function (event) {
            currentSong = null;
            isPlaying = false;
        });
        
        $scope.$on('audioPlayer:pause', function (event) {
            isPlaying = false;
        });
        
        $scope.$on('audioPlayer:resume', function (event) {
            isPlaying = true;
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
        
        $scope.isPlaying = function () {
            return isCurrentSong() && isPlaying;
        };
        
        $scope.togglePlay = function () {
            if (isCurrentSong()) {
                if (isPlaying) {
                    audioPlayerSrv.pause();
                } else {
                    audioPlayerSrv.play();
                }
            } else {
                audioPlayerSrv.play($scope.song);
            }
        };
        
        $scope.remove = function (songs) {
            $scope.onRemove({ song: songs });
        };
        
        setOptions();
    }
     
    SongDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return SongDrtCtrl;
});
