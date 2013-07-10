/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function SongbarDrtCtrl ($scope, audioPlayerSrv) {
        var DEFAULT_OPTIONS = {
            remove: false,
            play: true,
            queue: true,
            playlists: true,
            filterPlaylists: true
        };
        
        this.setOptions = function (options) {
            $scope.options = angular.extend({}, DEFAULT_OPTIONS, options);
            $scope.playlistsOptions.filter = $scope.options.filteredPlaylists;
        };
        
        $scope.playlistsOptions = {
            filter: DEFAULT_OPTIONS.filterPlaylists
        };
        
        $scope.songs = [];
        $scope.selectedSongs = [];
        $scope.playlistStores = [];
        
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
        
        $scope.queue = function () {
            if ($scope.selectedSongs.length) {
                audioPlayerSrv.enqueue($scope.selectedSongs);
            } else {
                audioPlayerSrv.enqueue($scope.songs);
            }
            $scope.deselect();
        };
        
        $scope.deselect = function () {
            $scope.selectedSongs.length = 0;
        };
    }
    
    SongbarDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return SongbarDrtCtrl;
});
