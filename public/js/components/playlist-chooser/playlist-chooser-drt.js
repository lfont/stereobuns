/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function playlistChooserDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=',
                songs: '='
            },
            templateUrl: 'playlist-chooser-drt.html',
            controller: 'PlaylistChooserDrtCtrl'
        };
    }
    
    return playlistChooserDrtFactory;
});
