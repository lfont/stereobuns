/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function StreamCtrl ($scope) {
        $scope.playlistsTemplateUrl = 'playlists.html';
        $scope.overviewTemplateUrl = 'overview.html';
        $scope.searchFiltersTemplateUrl = 'search-filters.html';
        $scope.searchResultTemplateUrl = 'search-result.html';
    }
    
    StreamCtrl.$inject = [ '$scope' ];
    
    return StreamCtrl;
});
