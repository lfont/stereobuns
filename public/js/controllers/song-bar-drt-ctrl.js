/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function SongBarDrtCtrl ($scope, $window, audioPlayerSrv) {
        var DEFAULT_OPTIONS = {
            remove: false,
            play: true,
            add: true,
            playlists: true
        };
        
        this.setOptions = function (options) {
            var opts = angular.extend({}, DEFAULT_OPTIONS, options);
            $scope.options = opts;
        };
        
        $scope.songs = [];
        $scope.selectedSongs = [];
        
        // TODO: get the playlist list
        $scope.playlists = [
            { name: 'playlist 1' },
            { name: 'playlist 2' }
        ];
        
        $scope.clearSelection = function () {
            $scope.selectedSongs.length = 0;
        };
        
        $scope.clearQueue = function () {
            audioPlayerSrv.clearQueue();
            $scope.clearSelection();
        };
        
        $scope.play = function () {
            if ($scope.selectedSongs.length) {
                audioPlayerSrv.enqueue($scope.selectedSongs);
                audioPlayerSrv.play($scope.selectedSongs[0]);
            } else {
                audioPlayerSrv.enqueue($scope.songs);
                audioPlayerSrv.play($scope.songs[0]);
            }
            $scope.clearSelection();
        };
        
        $scope.add = function () {
            if ($scope.selectedSongs.length) {
                audioPlayerSrv.enqueue($scope.selectedSongs);
            } else {
                audioPlayerSrv.enqueue($scope.songs);
            }
            $scope.clearSelection();
        };
        
        $scope.addToPlaylist = function (playlist) {
            $window.alert('TODO: addToPlaylist(' + playlist.name + ')');
        };
        
        this.setOptions();
    }
    
    SongBarDrtCtrl.$inject = [ '$scope', '$window', 'audioPlayerSrv' ];
    
    return SongBarDrtCtrl;
});
