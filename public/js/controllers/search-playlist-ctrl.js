/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchResultCtrl ($scope) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        $scope.songs = [];
        $scope.selectedSongs = [];
        
        $scope.$on('playlist', function (event, playlist) {
            if (playlist.type === 'search') {
                $scope.songs = playlist.songs;
                $scope.selectedSongs.length = 0;
            }
        });
        
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
    
    SearchResultCtrl.$inject = [ '$scope' ];
    
    return SearchResultCtrl;
});
