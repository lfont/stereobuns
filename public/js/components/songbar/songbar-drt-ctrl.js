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
        
        function setOptions () {
            $scope.options = angular.extend({}, DEFAULT_OPTIONS, $scope.customOptions);
            $scope.playlistsOptions.filter = $scope.options.filterPlaylists;
        }
        
        $scope.playlistsOptions = {
            filter: DEFAULT_OPTIONS.filterPlaylists
        };
        
        $scope.getSongs = function () {
            return $scope.selectedSongs.length ?
                $scope.selectedSongs :
                $scope.allSongs;
        };
        
        $scope.remove = function () {
            $scope.onRemove({ songs: $scope.getSongs() });
            $scope.deselect();
        };
        
        $scope.play = function () {
            var songs = $scope.getSongs();
            audioPlayerSrv.enqueue(songs);
            audioPlayerSrv.play(songs[0]);
            $scope.deselect();
        };
        
        $scope.queue = function () {
            audioPlayerSrv.enqueue($scope.getSongs());
            $scope.deselect();
        };
        
        $scope.deselect = function () {
            $scope.selectedSongs.length = 0;
        };
        
        setOptions();
    }
    
    SongbarDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return SongbarDrtCtrl;
});
