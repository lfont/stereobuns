/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope, $routeParams, soundSearchSrv, filterFilter) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        function search (query) {
            var promise = soundSearchSrv.search(query);
            promise.then(function (playlist) {
                $scope.playlist = playlist;
                $scope.selectedSongs.length = 0;
                $scope.filterBy();
            }, function (error) {
                // TODO: handle error
            });
        }
        
        function filterPredicate (song) {
            var words, i, len;
            
            if (!$scope.searchFilter) {
                return true;
            }
            
            words = song[$scope.searchFilter].split(/ +/);
            for (i = 0, len = words.length; i < len; i++) {
                if (words[i].localeCompare($scope.playlist.name,
                                           'en-US',
                                           { sensitivity: 'base' }) === 0) {
                    return true;
                }
            }

            return false;
        }
        
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.playlist = null;
        $scope.filteredSongs = [];
        $scope.selectedSongs = [];
        $scope.searchFilter = null;
        
        $scope.filterBy = function (filter) {
            $scope.searchFilter = filter;
            
            if ($scope.playlist) {
                $scope.filteredSongs = filterFilter($scope.playlist.songs,
                                                    filterPredicate);
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
    
    SearchCtrl.$inject = [ '$scope', '$routeParams', 'soundSearchSrv', 'filterFilter' ];
    
    return SearchCtrl;
});
