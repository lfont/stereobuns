/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function songbarDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: {
                customOptions: '=options',
                allSongs: '=',
                selectedSongs: '=',
                onRemove: '&'
            },
            templateUrl: 'songbar-drt.html',
            controller: 'SongbarDrtCtrl'
        };
    }
    
    return songbarDrtFactory;
});
