/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function playlistsDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=',
                songs: '='
            },
            templateUrl: 'playlists-drt.html',
            controller: 'PlaylistsDrtCtrl'
        };
    }
    
    return playlistsDrtFactory;
});
