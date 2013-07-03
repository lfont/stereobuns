/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function SongsCtrl ($scope, $routeParams, songsMdl) {
        function getSelectedSongIndex (song) {
            return $scope.selectedSongs.indexOf(song);
        }
        
        function setSongsStore (name) {
            var songsStore = songsMdl.getSongsStore(name),
                promise    = songsStore.songs();
            
            $scope.name = songsStore.name;
            
            promise.then(function (songs) {
                $scope.songs = songs;
            }, function (error) {
                // TODO: handle error
            });
        }
        
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.name = '';
        $scope.songs = [];
        $scope.selectedSongs = [];
        
        $scope.$on('songsStore:add', function (event, name, song) {
            if (name === 'loved') {
                $scope.songs.push(song);
            }
        });
        
        $scope.$on('songsStore:remove', function (event, name, song) {
            var songIndex;
            if (name === 'loved') {
                songIndex = $scope.songs.indexOf(song);
                $scope.songs.splice(songIndex, 1);
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
        
        setSongsStore($routeParams.name);
    }

    SongsCtrl.$inject = [ '$scope', '$routeParams', 'songsMdl' ];
    
    return SongsCtrl;
});
