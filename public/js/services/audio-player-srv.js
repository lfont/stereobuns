/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'soundmanager2'
], function (soundManager) {
    'use strict';
    
    function AudioPlayerSrvFactory ($rootScope, $document) {
        var audio = $document.find('audio')[0];
        
        return {
            play: function (song) {
                audio.pause();
                
                $rootScope.$broadcast('audioPlayer:play', song);
                audio.type = song.mimetype;
                audio.src = song.url;
                audio.load();
                audio.play();
            }
        };
    }
    
    AudioPlayerSrvFactory.$inject = [ '$rootScope', '$document' ];
    
    return AudioPlayerSrvFactory;
});
