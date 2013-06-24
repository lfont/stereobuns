/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function SongDrtCtrl ($scope, audioPlayerSrv, playlistSrv) {
        var currentSong = audioPlayerSrv.getCurrentSong(),
            lovedPlaylistStore = playlistSrv.getStore('Loved');
            
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
            if ($scope.isLoved) {
                lovedPlaylistStore.remove($scope.song);
                $scope.isLoved = false;
            } else {
                lovedPlaylistStore.add($scope.song);
                $scope.isLoved = true;
            }
        };
    }
     
    SongDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'playlistSrv' ];
    
    return SongDrtCtrl;
});
