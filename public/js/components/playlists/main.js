/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './playlists-drt-ctrl',
    './playlists-drt'
], function (angular,
             PlaylistsDrtCtrl,
             playlistsDrtFactory) {
    'use strict';
    
    var playlistsComponent = angular.module('soundrocket.components.playlists', [
        'soundrocket.models'
    ]);
    
    playlistsComponent.controller('PlaylistsDrtCtrl', PlaylistsDrtCtrl)
                      .directive('playlists', playlistsDrtFactory);
    
    return playlistsComponent;
});
