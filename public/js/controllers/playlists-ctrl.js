/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistsCtrl ($scope, $location, playlistMdl) {
        function loadPlaylistStores () {
            var promise = playlistMdl.getPlaylistStores();
            promise.then(function (playlistStores) {
                $scope.playlistStores = playlistStores;
            }, function (error) {
                // TODO: handle error
            });
        }
        
        $scope.playlistStores = [];
        
        $scope.isCurrentPlaylistStore = function (playlistStore) {
            var playlistStoreNamePattern = /^\/playlist\/(.*)/,
                matchs = playlistStoreNamePattern.exec($location.path());
            
            return matchs &&
                   matchs[1].toLowerCase() === playlistStore.name.toLowerCase();
        };
        
        loadPlaylistStores();
    }

    PlaylistsCtrl.$inject = [ '$scope', '$location', 'playlistMdl' ];
    
    return PlaylistsCtrl;
});
