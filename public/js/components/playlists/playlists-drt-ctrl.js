/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';

    function PlaylistsDrtCtrl ($scope, $location, playlistMdl) {
        var DEFAULT_OPTIONS = {
            filter: true
        };
        
        function filterPlaylistStoresForLocation (playlistStores) {
            var playlistNamePattern = /^\/playlist\/(.*)/,
                stores = [],
                i, len, playlistStore, matchs;
            
            for (i = 0, len = playlistStores.length; i < len; i++) {
                playlistStore = playlistStores[i];
                matchs = playlistNamePattern.exec($location.path());
                if (!matchs ||
                    matchs[1].toLowerCase() !== playlistStore.name.toLowerCase())
                {
                    stores.push(playlistStore);
                }
            }
            
            return stores;
        }
        
        this.setOptions = function (options) {
            var opts    = angular.extend({}, DEFAULT_OPTIONS, options),
                promise = playlistMdl.getPlaylistStores();
            
            promise.then(function (playlistStores) {
                $scope.playlistStores = opts.filter ?
                    filterPlaylistStoresForLocation(playlistStores) :
                    playlistStores;
            }, function (error) {
                // TODO: handle error
            });
        };
                
        $scope.addToPlaylist = function (playlistStore) {
            playlistStore.add($scope.songs);
        };
    }
     
    PlaylistsDrtCtrl.$inject = [ '$scope', '$location', 'playlistMdl' ];
    
    return PlaylistsDrtCtrl;
});
