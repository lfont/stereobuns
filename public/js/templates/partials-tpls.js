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
  'text!partials/songs-groups.html',
  'text!partials/songs-group.html',
  'text!partials/user-menu.html',
  'text!partials/no-loved-songs.html',
  'text!partials/no-mostplayed-songs.html',
  'text!partials/no-playlist-songs.html',
  'text!partials/settings.html',
  'text!partials/song-info.html'
], function (angular,
             rootTemplate,
             searchTemplate, searchBarTemplate,
             audioPlayerBarTemplate, audioPlayerQueueTemplate,
             playlistsTemplate, playlistTemplate,
             songsGroupsTemplate, songsGroupTemplate,
             userMenuTemplate,
             noLovedSongsTemplate, noMostPlayedSongsTemplate,
             noPlaylistSongsTemplate,
             settingsTemplate,
             songInfoTemplate) {
  'use strict';

  var partialsTemplateModule = angular.module('soundrocket.templates.partials', []);

  partialsTemplateModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('partials/search-bar.html', searchBarTemplate);

    $templateCache.put('partials/user-menu.html', userMenuTemplate);
    $templateCache.put('partials/settings.html', settingsTemplate);

    $templateCache.put('partials/root.html', rootTemplate);

    $templateCache.put('partials/search.html', searchTemplate);

    $templateCache.put('partials/audio-player-bar.html', audioPlayerBarTemplate);
    $templateCache.put('partials/audio-player-queue.html', audioPlayerQueueTemplate);

    $templateCache.put('partials/playlists.html', playlistsTemplate);
    $templateCache.put('partials/playlist.html', playlistTemplate);

    $templateCache.put('partials/songs-groups.html', songsGroupsTemplate);
    $templateCache.put('partials/songs-group.html', songsGroupTemplate);

    $templateCache.put('partials/no-loved-songs.html', noLovedSongsTemplate);
    $templateCache.put('partials/no-mostplayed-songs.html', noMostPlayedSongsTemplate);
    $templateCache.put('partials/no-playlist-songs.html', noPlaylistSongsTemplate);

    $templateCache.put('partials/song-info.html', songInfoTemplate);
  }]);

  return partialsTemplateModule;
});
