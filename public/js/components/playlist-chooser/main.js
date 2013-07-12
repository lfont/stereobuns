/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    './playlist-chooser-drt-ctrl',
    './playlist-chooser-drt',
    'models'
], function (angular,
             PlaylistChooserDrtCtrl,
             playlistChooserDrtFactory) {
    'use strict';
    
    var playlistChooserComponent = angular.module('soundrocket.components.playlist-chooser', [
        'soundrocket.models'
    ]);
    
    playlistChooserComponent.controller('PlaylistChooserDrtCtrl', PlaylistChooserDrtCtrl)
                            .directive('playlistChooser', playlistChooserDrtFactory);
    
    return playlistChooserComponent;
});
