/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';

    function PlaylistCtrl ($scope, $routeParams) {
        $scope.playlistsTemplateUrl = 'playlists.html';
    }

    PlaylistCtrl.$inject = [ '$scope', '$routeParams' ];
    
    return PlaylistCtrl;
});
