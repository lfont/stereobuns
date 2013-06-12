/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerQueueCtrl ($scope, audioPlayerSrv, player) {
        $scope.songs = player.songs;
        $scope.song = player.song;
        $scope.isPlaying = player.isPlaying;
        
        $scope.isCurrentSong = function (song) {
            return song === $scope.song;
        };
        
        $scope.play = function (song) {
            if ($scope.isCurrentSong(song)) {
                audioPlayerSrv.play();
            } else {
                audioPlayerSrv.play(song);
            }
        };
    }
    
    AudioPlayerQueueCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'player' ];
    
    return AudioPlayerQueueCtrl;
});
