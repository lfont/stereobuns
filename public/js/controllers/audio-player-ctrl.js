/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function AudioPlayerCtrl ($scope, $document) {
        var audio = $document.find('audio')[0];
        
        $scope.song = {};
        
        $scope.$on('player:play', function (event, song) {
            $scope.song = song;
            
            audio.pause();
            audio.type = song.mimetype;
            audio.src = song.url;
            audio.load();
            audio.play();
        });
    }
    
    AudioPlayerCtrl.$inject = [ '$scope', '$document' ];
    
    return AudioPlayerCtrl;
});
