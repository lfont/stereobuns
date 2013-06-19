/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope, filterFilter) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.playlist = null;
        $scope.filteredSongs = [];
        $scope.selectedSongs = [];
        $scope.searchFilter = null;
        
        $scope.$on('playlist', function (event, playlist) {
            if (playlist.type === 'search') {
                $scope.playlist = playlist;
                $scope.filteredSongs = playlist.songs;
                $scope.selectedSongs.length = 0;
            }
        });
        
        $scope.filterBy = function (filter) {
            $scope.searchFilter = null;
            
            if ($scope.playlist) {
                if (filter) {
                    $scope.searchFilter = {};
                    $scope.searchFilter[filter] = $scope.playlist.name;
                }
            
                $scope.filteredSongs = filterFilter($scope.playlist.songs, $scope.searchFilter);
            }
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
    
    SearchCtrl.$inject = [ '$scope', 'filterFilter' ];
    
    return SearchCtrl;
});
