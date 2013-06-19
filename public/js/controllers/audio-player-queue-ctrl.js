/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerQueueCtrl ($scope) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        $scope.songs = [];
        $scope.selectedSongs = [];
        
        $scope.songBarOptions = {
            remove: true,
            play: false,
            add: false
        };
        
        $scope.modalOptions = {
            backdrop: true,
            keyboard: true,
            backdropClick: true
        };
        
        $scope.$on('audioPlayerQueue:open', function (event) {
            $scope.shouldBeOpen = true;
        });
        
        $scope.$on('audioPlayerQueue:songs', function (event, songs) {
            $scope.songs = songs;
            $scope.selectedSongs.length = 0;
        });
        
        $scope.close = function () {
            $scope.shouldBeOpen = false;
            $scope.selectedSongs.length = 0;
        };
        
        $scope.toggleSongSelection = function (song) {
            var songIndex = getSelectedSongIndex(song);
            if (songIndex > -1) {
                $scope.selectedSongs.splice(songIndex, 1);
            } else {
                $scope.selectedSongs.push(song);
            }
        };
        
        $scope.getSongClass = function (song) {
            return getSelectedSongIndex(song) > -1 ?
                'selected' :
                '';
        };
    }
    
    AudioPlayerQueueCtrl.$inject = [ '$scope' ];
    
    return AudioPlayerQueueCtrl;
});
