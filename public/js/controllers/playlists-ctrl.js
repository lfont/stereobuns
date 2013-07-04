/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistsCtrl ($scope, $location, songsMdl, playlistMdl) {
        function loadSongsStores () {
            $scope.songsStores = songsMdl.getSongsStores();
        }
        
        function loadPlaylistStores () {
            var promise = playlistMdl.getPlaylistStores();
            promise.then(function (playlistStores) {
                $scope.playlistStores = playlistStores;
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

    PlaylistsCtrl.$inject = [ '$scope', '$location', 'songsMdl', 'playlistMdl' ];
    
    return PlaylistsCtrl;
});
