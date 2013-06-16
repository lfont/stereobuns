/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SongDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'song-drt.html',
            controller: [ '$scope', 'audioPlayerSrv', function ($scope, audioPlayerSrv) {
                var currentSong = audioPlayerSrv.getCurrentSong();
                    
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
                
                $scope.isCurrent = function () {
                    return $scope.song === currentSong;
                };
        
                $scope.play = function ($event) {
                    $event.preventDefault();
                    
                    if ($scope.isCurrent()) {
                        audioPlayerSrv.play();
                    } else {
                        audioPlayerSrv.play($scope.song);
                    }
                };
            } ],
            
            link: function (scope, iElement, iAttrs, controller) {
                iAttrs.$observe('data', function (value) {
                    scope.song = scope.$parent.$eval(value);
                });
            }
        };
    }
    
    SongDrtFactory.$inject = [];
    
    return SongDrtFactory;
});
