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
            var promise = soundSearchSrv.search(query);
            promise.then(function (playlist) {
                $scope.playlist = playlist;
                $scope.selectedSongs.length = 0;
                $scope.filterBy();
            }, function (error) {
                // TODO: handle error
            });
        }
        
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.playlist = null;
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
