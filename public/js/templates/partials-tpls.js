/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'text!partials/root.html',
  'text!partials/search.html',
  'text!partials/search-bar.html',
  'text!partials/audio-player-bar.html',
  'text!partials/audio-player-queue.html',
  'text!partials/playlists.html',
  'text!partials/playlist.html',
  'text!partials/songs-status.html',
  'text!partials/songs.html',
  'text!partials/user-menu.html',
  'text!partials/no-loved-songs.html',
  'text!partials/no-mostplayed-songs.html',
  'text!partials/no-playlist-songs.html'
], function (angular,
             rootTemplate,
             searchTemplate, searchBarTemplate,
             audioPlayerBarTemplate, audioPlayerQueueTemplate,
             playlistsTemplate, playlistTemplate,
             songsStatusTemplate, songsTemplate,
             userMenuTemplate,
             noLovedSongsTemplate, noMostPlayedSongsTemplate,
             noPlaylistSongsTemplate) {
  'use strict';

  var partialsTemplateModule = angular.module('soundrocket.templates.partials', []);

  partialsTemplateModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('partials/search-bar.html', searchBarTemplate);
    $templateCache.put('partials/user-menu.html', userMenuTemplate);

    $templateCache.put('partials/root.html', rootTemplate);

    $templateCache.put('search.html', searchTemplate);

    $templateCache.put('partials/audio-player-bar.html', audioPlayerBarTemplate);
    $templateCache.put('audio-player-queue.html', audioPlayerQueueTemplate);

    $templateCache.put('playlists.html', playlistsTemplate);
    $templateCache.put('playlist.html', playlistTemplate);

    $templateCache.put('songs-status.html', songsStatusTemplate);
    $templateCache.put('songs.html', songsTemplate);

    $templateCache.put('no-loved-songs.html', noLovedSongsTemplate);
    $templateCache.put('no-mostplayed-songs.html', noMostPlayedSongsTemplate);
    $templateCache.put('no-playlist-songs.html', noPlaylistSongsTemplate);
  }]);

  return partialsTemplateModule;
});
