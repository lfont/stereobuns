/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './songs-actions-drt-ctrl',
    './songs-actions-drt',
    'services',
    'models',
    'components/playlist-chooser'
], function (angular,
             SongsActionsDrtCtrl,
             songsActionsDrtFactory) {
    'use strict';
    
    var songbarComponent = angular.module('soundrocket.components.songs-actions', [
        'soundrocket.services',
        'soundrocket.models',
        'soundrocket.components.playlist-chooser'
    ]);
    
    songbarComponent.controller('SongsActionsDrtCtrl', SongsActionsDrtCtrl)
                    .directive('songsActions', songsActionsDrtFactory);
    
    return songbarComponent;
});
