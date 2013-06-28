/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function LayoutCtrl ($scope) {
        $scope.searchBarTemplateUrl = 'search-bar.html';
        $scope.userMenuTemplateUrl = 'user-menu.html';
        $scope.audioPlayerBarTemplateUrl = 'audio-player-bar.html';
    }
    
    LayoutCtrl.$inject = [ '$scope' ];
    
    return LayoutCtrl;
});
