/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerQueueCtrl ($scope, audioPlayerScope) {
        $scope.songs = audioPlayerScope.songs;
    }
    
    AudioPlayerQueueCtrl.$inject = [ '$scope', 'audioPlayerScope' ];
    
    return AudioPlayerQueueCtrl;
});
