/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './song-drt-ctrl',
    './song-drt',
    'services',
    'models',
    'components/songs-actions'
], function (angular,
             SongDrtCtrl,
             songDrtFactory) {
    'use strict';
    
    var songComponent = angular.module('soundrocket.components.song', [
        'soundrocket.services',
        'soundrocket.models',
        'soundrocket.components.songs-actions'
    ]);
    
    songComponent.controller('SongDrtCtrl', SongDrtCtrl)
                 .directive('song', songDrtFactory);
    
    return songComponent;
});
