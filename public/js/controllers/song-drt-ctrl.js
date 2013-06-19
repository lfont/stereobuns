/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function SongDrtCtrl ($scope, audioPlayerSrv) {
        var currentSong = audioPlayerSrv.getCurrentSong();
            
        $scope.isPlaying = audioPlayerSrv.isPlaying();
        $scope.isLoved = false;
        
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

        $scope.play = function () {
            if ($scope.isCurrent()) {
                audioPlayerSrv.play();
            } else {
                audioPlayerSrv.play($scope.song);
            }
        };
        
        $scope.toggleLoveStatus = function () {
            console.log('TODO: toggleLoveStatus()');
        };
    }
     
    SongDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return SongDrtCtrl;
});
