/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  // angular-ui
  'text!angular-ui-bootstrap-template/dialog/message.html',
  'text!angular-ui-bootstrap-template/alert/alert.html',
  // TODO
  'text!partials/playlist-chooser-drt.html',
  'text!partials/song-progress-drt.html',
  'text!partials/songs-actions-drt.html',
  'text!partials/root.html',
  'text!partials/playlist.html',
  'text!partials/songs-group.html',
  'text!partials/user-menu.html',
  'text!partials/no-loved-songs.html',
  'text!partials/no-mostplayed-songs.html',
  'text!partials/no-playlist-songs.html',
  'text!partials/settings.html',
  'text!partials/user-profile.html',
  'text!partials/user-profile-menu.html',
  // features
  'text!partials/audio-player.html',
  'text!partials/audio-player-queue.html',
  'text!partials/keyboard-shortcuts.html',
  'text!partials/similar-tracks.html',
  'text!partials/track.html',
  'text!partials/track-info.html',
  'text!partials/track-search.html',
  'text!partials/track-search-results.html',
  // modules
  'angular-animate',
  'angular-ui-bootstrap-collapse',
  'angular-ui-bootstrap-dropdownToggle',
  'angular-ui-bootstrap-dialog',
  'angular-ui-bootstrap-alert'
], function (angular,
             // angular ui
             dialogMessageTpl,
             alertTpl,
             // TODO
             playlistChooserTpl,
             songProgressTpl,
             songsActionsTpl,
             rootTpl,
             playlistTpl,
             songsGroupTpl,
             userMenuTpl,
             noLovedSongsTpl,
             noMostPlayedSongsTpl,
             noPlaylistSongsTpl,
             settingsTpl,
             userProfileTpl,
             userProfileMenuTpl,
             // features
             audioPlayerTpl,
             audioPlayerQueueTpl,
             keyboardShortcutsTpl,
             similarTracksTpl,
             trackTpl,
             trackInfoTpl,
             trackSearchTpl,
             trackSearchResultsTpl) {
  'use strict';

  var module = angular.module('soundrocket.templates', [
    'ngAnimate',
    'ui.bootstrap.collapse',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.dialog',
    'ui.bootstrap.alert'
  ]);
  
  module.run(['$templateCache', function ($templateCache) {
    // angular ui
    $templateCache.put('template/dialog/message.html', dialogMessageTpl);
    $templateCache.put('template/alert/alert.html', alertTpl);
    // TODO
    $templateCache.put('text!partials/playlist-chooser-drt.html', playlistChooserTpl);
    $templateCache.put('text!partials/song-progress-drt.html', songProgressTpl);
    $templateCache.put('text!partials/songs-actions-drt.html', songsActionsTpl);
    $templateCache.put('text!partials/root.html', rootTpl);
    $templateCache.put('text!partials/playlist.html', playlistTpl);
    $templateCache.put('text!partials/songs-group.html', songsGroupTpl);
    $templateCache.put('text!partials/user-menu.html', userMenuTpl);
    $templateCache.put('text!partials/no-loved-songs.html', noLovedSongsTpl);
    $templateCache.put('text!partials/no-mostplayed-songs.html', noMostPlayedSongsTpl);
    $templateCache.put('text!partials/no-playlist-songs.html', noPlaylistSongsTpl);
    $templateCache.put('text!partials/settings.html', settingsTpl);
    $templateCache.put('text!partials/user-profile.html', userProfileTpl);
    $templateCache.put('text!partials/user-profile-menu.html', userProfileMenuTpl);
    // features
    $templateCache.put('text!partials/audio-player.html', audioPlayerTpl);
    $templateCache.put('text!partials/audio-player-queue.html', audioPlayerQueueTpl);
    $templateCache.put('text!partials/keyboard-shortcuts.html', keyboardShortcutsTpl);
    $templateCache.put('text!partials/similar-tracks.html', similarTracksTpl);
    $templateCache.put('text!partials/track.html', trackTpl);
    $templateCache.put('text!partials/track-info.html', trackInfoTpl);
    $templateCache.put('text!partials/track-search.html', trackSearchTpl);
    $templateCache.put('text!partials/track-search-results.html', trackSearchResultsTpl);
  }]);
  
  return module;
});
