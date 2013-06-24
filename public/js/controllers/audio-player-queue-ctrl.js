/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerQueueCtrl ($scope, audioPlayerSrv) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        $scope.queue = audioPlayerSrv.getQueue();
        $scope.selectedSongs = [];
        
        $scope.songBarOptions = {
            remove: true,
            play: false,
            add: false
        };
        
        $scope.modalOptions = {
            backdrop: false,
            backdropClick: false,
            keyboard: true
        };
        
        $scope.$on('audioPlayer:clearQueue', function (event) {
            $scope.selectedSongs.length = 0;
        });
        
        $scope.$on('audioPlayerBar:toggleQueue', function (event, shouldBeOpen) {
            $scope.shouldBeOpen = shouldBeOpen;
        });
        
        $scope.close = function () {
            $scope.shouldBeOpen = false;
            $scope.selectedSongs.length = 0;
            $scope.$emit('audioPlayerQueue:close');
        };
        
        $scope.toggleSongSelection = function (song) {
            var songIndex = getSelectedSongIndex(song);
            if (songIndex > -1) {
                $scope.selectedSongs.splice(songIndex, 1);
            } else {
                $scope.selectedSongs.push(song);
            }
        };
        
        $scope.isSongSelected = function (song) {
            return getSelectedSongIndex(song) > -1;
        };
    }
    
    AudioPlayerQueueCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return AudioPlayerQueueCtrl;
});
