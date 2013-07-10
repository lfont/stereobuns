/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './songbar-drt-ctrl',
    './songbar-drt'
], function (angular,
             SongbarDrtCtrl,
             songbarDrtFactory) {
    'use strict';
    
    var songbarComponent = angular.module('soundrocket.components.songbar', [
        'soundrocket.services',
        'soundrocket.models'
    ]);
    
    songbarComponent.controller('SongbarDrtCtrl', SongbarDrtCtrl)
                    .directive('songbar', songbarDrtFactory);
    
    return songbarComponent;
});
