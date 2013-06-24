/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function SongBarDrtCtrl ($scope, $location, audioPlayerSrv, playlistSrv) {
        var DEFAULT_OPTIONS = {
            remove: false,
            play: true,
            add: true,
            playlists: true
        };
        
        function filterPlaylistStores (playlistStores) {
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
            var opts = angular.extend({}, DEFAULT_OPTIONS, options);
            $scope.options = opts;
        };
        
        $scope.songs = [];
        $scope.selectedSongs = [];
        $scope.playlistStores = filterPlaylistStores(playlistSrv.getStores());
        
        $scope.remove = function () {
            if ($scope.selectedSongs.length) {
                $scope.onRemove($scope.selectedSongs);
            } else {
                $scope.onRemove($scope.songs);
            }
            $scope.deselect();
        };
        
        $scope.play = function () {
            if ($scope.selectedSongs.length) {
                audioPlayerSrv.enqueue($scope.selectedSongs);
                audioPlayerSrv.play($scope.selectedSongs[0]);
            } else {
                audioPlayerSrv.enqueue($scope.songs);
                audioPlayerSrv.play($scope.songs[0]);
            }
            $scope.deselect();
        };
        
        $scope.add = function () {
            if ($scope.selectedSongs.length) {
                audioPlayerSrv.enqueue($scope.selectedSongs);
            } else {
                audioPlayerSrv.enqueue($scope.songs);
            }
            $scope.deselect();
        };
        
        $scope.addToPlaylist = function (playlistStore) {
            if ($scope.selectedSongs.length) {
                playlistStore.add($scope.selectedSongs);
            } else {
                playlistStore.add($scope.songs);
            }
        };
        
        $scope.deselect = function () {
            $scope.selectedSongs.length = 0;
        };
        
        this.setOptions();
    }
    
    SongBarDrtCtrl.$inject = [ '$scope', '$location', 'audioPlayerSrv', 'playlistSrv' ];
    
    return SongBarDrtCtrl;
});
