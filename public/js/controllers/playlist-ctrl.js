/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistCtrl ($scope, $routeParams, playlistSrv) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        function setPlaylistStore (name) {
            $scope.playlistStore = playlistSrv.getStore(name);
        }
        
        $scope.songBarOptions = {
            remove: true
        };
        
        $scope.playlistStore = null;
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.selectedSongs = [];
        
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
        
        setPlaylistStore($routeParams.name);
    }

    PlaylistCtrl.$inject = [ '$scope', '$routeParams', 'playlistSrv' ];
    
    return PlaylistCtrl;
});
