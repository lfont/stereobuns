/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope, $routeParams, $filter, soundSearchSrv) {
        var songFilter = $filter('song');
        
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        function search (query) {
            $scope.searchFilter = null;
            $scope.isSearching = true;
            $scope.playlist.name = query;
            $scope.playlist.songs.length = 0;
            soundSearchSrv.search(query);
        }
        
        $scope.$on('soundSearch:result', function (event, result) {
            $scope.isSearching = false;
            $scope.playlist.songs = $scope.playlist.songs.concat(result.results);
            $scope.selectedSongs.length = 0;
            $scope.filterBy($scope.searchFilter);
        });
        
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.isSearching = false;
        $scope.playlist = {
            name: null,
            songs: []
        };
        $scope.filteredSongs = [];
        $scope.selectedSongs = [];
        $scope.searchFilter = null;
        
        $scope.filterBy = function (property) {
            $scope.searchFilter = property;
            
            if ($scope.playlist) {
                $scope.filteredSongs = songFilter($scope.playlist.songs,
                                                  $scope.searchFilter,
                                                  $scope.playlist.name);
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
        
        search($routeParams.q);
    }
    
    SearchCtrl.$inject = [ '$scope', '$routeParams', '$filter', 'soundSearchSrv' ];
    
    return SearchCtrl;
});
