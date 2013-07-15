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
        
        function isCurrentSong () {
            var song = audioPlayerSrv.getStatus().song;
            return song &&
                   $scope.song &&
                   song.url === $scope.song.url;
        }
        
        function isPlaying () {
            return audioPlayerSrv.getStatus().isPlaying;
        }
        
        function setOptions () {
            $scope.options = angular.extend({}, DEFAULT_OPTIONS, $scope.customOptions);
        }
        
        $scope.$on('songsStore:add', function (event, name, song) {
            if (name === 'Loved' &&
                isCurrentSong() &&
                !$scope.song.loved) {
                $scope.song.loved = true;
            }
        });
        
        $scope.$on('songsStore:remove', function (event, name, song) {
            if (name === 'Loved' &&
                isCurrentSong() &&
                $scope.song.loved) {
                $scope.song.loved = false;
            }
        });
        
        $scope.isPlaying = function () {
            return isCurrentSong() && isPlaying();
        };
        
        $scope.togglePlay = function () {
            if (isCurrentSong()) {
                if (isPlaying()) {
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
