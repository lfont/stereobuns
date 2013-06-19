/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        $scope.playlistOverviewTemplateUrl = 'playlist-overview.html';
        $scope.playlistsTemplateUrl = 'playlists.html';
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
        
        $scope.isSongSelected = function (song) {
            return getSelectedSongIndex(song) > -1;
        };
    }
    
    SearchCtrl.$inject = [ '$scope' ];
    
    return SearchCtrl;
});
