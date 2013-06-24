/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistsCtrl ($scope, $location, playlistSrv) {
        $scope.playlistStores = playlistSrv.getStores();
        
        $scope.isCurrentPlaylist = function (playlistStore) {
            var playlistNamePattern = /^\/playlist\/(.*)/,
                matchs = playlistNamePattern.exec($location.path());
            
            return matchs &&
                   matchs[1].toLowerCase() === playlistStore.name.toLowerCase();
        };
    }

    PlaylistsCtrl.$inject = [ '$scope', '$location', 'playlistSrv' ];
    
    return PlaylistsCtrl;
});
