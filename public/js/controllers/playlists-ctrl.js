/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistsCtrl ($scope, $location) {
        $scope.playlists = [
            'loved'
        ];
        
        $scope.playlist = 'loved';
    }

    PlaylistsCtrl.$inject = [ '$scope', '$location' ];
    
    return PlaylistsCtrl;
});
