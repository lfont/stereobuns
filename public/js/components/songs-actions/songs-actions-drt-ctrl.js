/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function SongsActionsDrtCtrl ($scope, audioPlayerSrv, songsMdl) {
        var DEFAULT_OPTIONS = {
            remove: false,
            play: false,
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
        
        $scope.isMulti = angular.isArray($scope.songs);
        
        $scope.isVisible = function () {
            var notDefined;
            return $scope.isMulti ?
                $scope.songs.length !== 0 :
                $scope.songs !== notDefined && $scope.songs !== null;
        };
        
        $scope.play = function () {
            var songs = $scope.songs;
            audioPlayerSrv.enqueue(songs);
            audioPlayerSrv.play($scope.isMulti ? songs[0] : songs);
        };
        
        $scope.queue = function () {
            audioPlayerSrv.enqueue($scope.songs);
        };
            
        $scope.toggleLove = function () {
            var lovedSongsStore = songsMdl.getSongsStore('loved');
            if ($scope.songs.loved) {
                lovedSongsStore.remove($scope.songs);
            } else {
                lovedSongsStore.add($scope.songs);
            }
        };
        
        $scope.remove = function () {
            $scope.onRemove({ songs: $scope.songs });
        };
        
        setOptions();
    }
    
    SongsActionsDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv', 'songsMdl' ];
    
    return SongsActionsDrtCtrl;
});
