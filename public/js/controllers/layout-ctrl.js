/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function LayoutCtrl ($scope) {
        $scope.searchTemplateUrl = 'search.html';
        $scope.audioPlayerTemplateUrl = 'audio-player.html';
    }
    
    LayoutCtrl.$inject = [ '$scope' ];
    
    return LayoutCtrl;
});
