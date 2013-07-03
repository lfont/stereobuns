/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistsCtrl ($scope, $location, songsMdl, playlistSrv) {
        
        function loadSongsStores () {
            $scope.songsStores = songsMdl.getSongsStores();
        }
        
        function loadPlaylistStores () {
            var promise = playlistSrv.getPlaylists();
            promise.then(function (playlists) {
                $scope.playlists = playlists;
            }, function (error) {
                // TODO: handle error
            });
        }
        
        $scope.songsStores = [];
        $scope.playlistStores = [];
        
        $scope.isCurrentSongsStore = function (songsStore) {
            var songsStoreNamePattern = /^\/songs\/(.*)/,
                matchs = songsStoreNamePattern.exec($location.path());
            
            return matchs &&
                   matchs[1].toLowerCase() === songsStore.name.toLowerCase();
        };
        
        $scope.isCurrentPlaylistStore = function (playlistStore) {
            var playlistStoreNamePattern = /^\/playlist\/(.*)/,
                matchs = playlistStoreNamePattern.exec($location.path());
            
            return matchs &&
                   matchs[1].toLowerCase() === playlistStore.name.toLowerCase();
        };
        
        loadSongsStores();
        loadPlaylistStores();
    }

    PlaylistsCtrl.$inject = [ '$scope', '$location', 'songsMdl', 'playlistSrv' ];
    
    return PlaylistsCtrl;
});
