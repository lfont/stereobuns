/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function StreamCtrl ($scope) {
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.playlistOverviewTemplateUrl = 'playlist-overview.html';
        $scope.searchFiltersTemplateUrl = 'search-filters.html';
        $scope.searchPlaylistTemplateUrl = 'search-playlist.html';
    }
    
    StreamCtrl.$inject = [ '$scope' ];
    
    return StreamCtrl;
});
