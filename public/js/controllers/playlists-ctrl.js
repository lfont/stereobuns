/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistsCtrl ($scope, $location, playlistSrv) {
        var promise = playlistSrv.getPlaylists();
        promise.then(function (playlists) {
            $scope.playlists = playlists;
        }, function (error) {
            // TODO: handle error
        });
        
        $scope.playlists = [];
        
        $scope.isCurrentPlaylist = function (playlist) {
            var playlistNamePattern = /^\/playlist\/(.*)/,
                matchs = playlistNamePattern.exec($location.path());
            
            return matchs &&
                   matchs[1].toLowerCase() === playlist.name.toLowerCase();
        };
    }

    PlaylistsCtrl.$inject = [ '$scope', '$location', 'playlistSrv' ];
    
    return PlaylistsCtrl;
});
