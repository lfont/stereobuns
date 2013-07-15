/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'text!partials/song-drt.html',
    'text!partials/songs-actions-drt.html',
    'text!partials/playlist-chooser-drt.html',
    'text!partials/song-progress-drt.html'
], function (angular,
             songDrtTemplate, songsActionsDrtTemplate,
             playlistChooserDrtTemplate, songProgressDrtTemplate) {
    'use strict';

    var componentsTemplateModule = angular.module('soundrocket.templates.components', []);

    componentsTemplateModule.run(['$templateCache', function ($templateCache) {
        $templateCache.put('song-drt.html', songDrtTemplate);
        $templateCache.put('songs-actions-drt.html', songsActionsDrtTemplate);
        $templateCache.put('playlist-chooser-drt.html', playlistChooserDrtTemplate);
        $templateCache.put('song-progress-drt.html', songProgressDrtTemplate);
    }]);

    return componentsTemplateModule;
});
