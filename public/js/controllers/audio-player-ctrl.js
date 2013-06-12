/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerCtrl ($scope) {
        $scope.song = {};
        
        $scope.$on('audioPlayer:play', function (event, song) {
            $scope.song = song;
        });
    }
    
    AudioPlayerCtrl.$inject = [ '$scope' ];
    
    return AudioPlayerCtrl;
});
