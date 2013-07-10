/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope, $routeParams, $filter, soundSearchSrv) {
        var songFilter = $filter('song'),
            searchResults = [];
        
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        function aggregateResults () {
            var results = [],
                i, len;
            
            searchResults.sort(function (a, b) {
                if (a.weight > b.weight) {
                    return -1;
                }
                
                if (a.weight < b.weight) {
                    return 1;
                }
                
                return 0;
            });
            
            for (i = 0, len = searchResults.length; i < len; i++) {
                results = results.concat(searchResults[i].results);
            }
            
            return results;
        }
        
        function search (query) {
            searchResults.length = 0;
            $scope.searchFilter = null;
            $scope.isSearching = true;
            $scope.searchQuery = query;
            $scope.songs.length = 0;
            soundSearchSrv.search(query);
        }
        
        $scope.$on('soundSearch:result', function (event, result) {
            searchResults.push(result);
            $scope.isSearching = false;
            $scope.selectedSongs.length = 0;
            $scope.filterBy($scope.searchFilter);
        });
        
        $scope.songsStatusTemplateUrl = 'songs-status.html';
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.isSearching = false;
        $scope.songs = [];
        $scope.selectedSongs = [];
        $scope.searchFilter = null;
        
        $scope.filterBy = function (property) {
            var allSongs, filteredSongs;
            
            $scope.searchFilter = property;
            
            if (searchResults.length) {
                allSongs = aggregateResults();
                filteredSongs = songFilter(allSongs,
                                           $scope.searchFilter,
                                           $scope.searchQuery);
                $scope.songs = filteredSongs;
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
        
        $scope.hasSearchResult = function () {
            return searchResults.length > 0;
        };
        
        search($routeParams.q);
    }
    
    SearchCtrl.$inject = [ '$scope', '$routeParams', '$filter', 'soundSearchSrv' ];
    
    return SearchCtrl;
});
