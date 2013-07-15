/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'text!partials/search.html',
    'text!partials/search-bar.html',
    'text!partials/audio-player-bar.html',
    'text!partials/audio-player-queue.html',
    'text!partials/playlists.html',
    'text!partials/playlist.html',
    'text!partials/songs-status.html',
    'text!partials/songs.html',
    'text!partials/user-menu.html'
], function (angular,
             searchTemplate, searchBarTemplate,
             audioPlayerBarTemplate, audioPlayerQueueTemplate,
             playlistsTemplate, playlistTemplate,
             songsStatusTemplate, songsTemplate,
             userMenuTemplate) {
    'use strict';

    var partialsTemplateModule = angular.module('soundrocket.templates.partials', []);

    partialsTemplateModule.run(['$templateCache', function ($templateCache) {
        $templateCache.put('search.html', searchTemplate);
        $templateCache.put('search-bar.html', searchBarTemplate);

        $templateCache.put('audio-player-bar.html', audioPlayerBarTemplate);
        $templateCache.put('audio-player-queue.html', audioPlayerQueueTemplate);

        $templateCache.put('playlists.html', playlistsTemplate);
        $templateCache.put('playlist.html', playlistTemplate);

        $templateCache.put('songs-status.html', songsStatusTemplate);
        $templateCache.put('songs.html', songsTemplate);

        $templateCache.put('user-menu.html', userMenuTemplate);
    }]);

    return partialsTemplateModule;
});
