/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistCtrl ($scope, $routeParams, $location, playlistMdl) {
        var currentPlaylistStore;
        
        function setPlaylistStore (name) {
            var promise = playlistMdl.getPlaylistStore(name);
            
            promise.then(function (playlistStore) {
                var promise = playlistStore.songs();
            
                currentPlaylistStore = playlistStore;
                $scope.name = playlistStore.name;
            
                promise.then(function (songs) {
                    $scope.songs = songs;
                }, function (error) {
                    // TODO: handle error
                });
            }, function (error) {
                // TODO: handle error
            });
        }
        
        $scope.songsActionsOptions = {
            play: true,
            remove: true
        };
        
        $scope.songOptions = {
            remove: true
        };
        
        $scope.songsStatusTemplateUrl = 'songs-status.html';
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.name = '';
        $scope.songs = [];
        
        $scope.$on('playlistStore:add', function (event, name, song) {
            if (name === $scope.name) {
                $scope.songs.push(song);
            }
        });
        
        $scope.$on('playlistStore:remove', function (event, name, song) {
            var songIndex;
            if (name === $scope.name) {
                songIndex = $scope.songs.indexOf(song);
                $scope.songs.splice(songIndex, 1);
            }
        });
        
        $scope.deletePlaylist = function () {
            playlistMdl.deletePlaylistStore(currentPlaylistStore);
            $location.path('/home');
        };
        
        $scope.remove = function (songs) {
            currentPlaylistStore.remove(songs);
        };
        
        setPlaylistStore($routeParams.name);
    }

    PlaylistCtrl.$inject = [ '$scope', '$routeParams', '$location', 'playlistMdl' ];
    
    return PlaylistCtrl;
});
