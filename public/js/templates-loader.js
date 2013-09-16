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
  'text!templates/playlist-chooser-drt.html',
  'text!templates/songs-actions-drt.html',
  'text!templates/playlist.html',
  'text!templates/songs-group.html',
  'text!templates/no-loved-songs.html',
  'text!templates/no-mostplayed-songs.html',
  'text!templates/no-playlist-songs.html',
  // features
  'text!templates/artist-info/artist-info.html',
  'text!templates/artist-info/similar-artists.html',
  'text!templates/artist-info/top-tracks.html',
  'text!templates/audio-player/audio-player.html',
  'text!templates/audio-player/audio-player-queue.html',
  'text!templates/home/home.html',
  'text!templates/keyboard-shortcuts/keyboard-shortcuts.html',
  'text!templates/settings/settings.html',
  'text!templates/track/track.html',
  'text!templates/track/progress/track-progress.html',
  'text!templates/track-info/track-info.html',
  'text!templates/track-info/similar-tracks.html',
  'text!templates/track-search/track-search.html',
  'text!templates/track-search/track-search-results.html',
  'text!templates/user/user-menu.html',
  'text!templates/user/user-profile.html',
  'text!templates/user/user-profile-menu.html',
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
             songsActionsTpl,
             playlistTpl,
             songsGroupTpl,
             noLovedSongsTpl,
             noMostPlayedSongsTpl,
             noPlaylistSongsTpl,
             // features
             artistInfoTpl,
             similarArtistsTpl,
             topTracksTpl,
             audioPlayerTpl,
             audioPlayerQueueTpl,
             homeTpl,
             keyboardShortcutsTpl,
             settingsTpl,
             trackTpl,
             trackProgressTpl,
             trackInfoTpl,
             similarTracksTpl,
             trackSearchTpl,
             trackSearchResultsTpl,
             userMenuTpl,
             userProfileTpl,
             userProfileMenuTpl) {
  'use strict';

  var module = angular.module('soundrocket.templates-loader', [
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
    $templateCache.put('templates/playlist-chooser-drt.html', playlistChooserTpl);
    $templateCache.put('templates/songs-actions-drt.html', songsActionsTpl);
    $templateCache.put('templates/playlist.html', playlistTpl);
    $templateCache.put('templates/songs-group.html', songsGroupTpl);
    $templateCache.put('templates/no-loved-songs.html', noLovedSongsTpl);
    $templateCache.put('templates/no-mostplayed-songs.html', noMostPlayedSongsTpl);
    $templateCache.put('templates/no-playlist-songs.html', noPlaylistSongsTpl);
    // features
    $templateCache.put('templates/artist-info/artist-info.html', artistInfoTpl);
    $templateCache.put('templates/artist-info/similar-artists.html', similarArtistsTpl);
    $templateCache.put('templates/artist-info/top-tracks.html', topTracksTpl);
    $templateCache.put('templates/audio-player/audio-player.html', audioPlayerTpl);
    $templateCache.put('templates/audio-player/audio-player-queue.html', audioPlayerQueueTpl);
    $templateCache.put('templates/home/home.html', homeTpl);
    $templateCache.put('templates/keyboard-shortcuts/keyboard-shortcuts.html', keyboardShortcutsTpl);
    $templateCache.put('templates/settings/settings.html', settingsTpl);
    $templateCache.put('templates/track/track.html', trackTpl);
    $templateCache.put('templates/track/progress/track-progress.html', trackProgressTpl);
    $templateCache.put('templates/track-info/track-info.html', trackInfoTpl);
    $templateCache.put('templates/track-info/similar-tracks.html', similarTracksTpl);
    $templateCache.put('templates/track-search/track-search.html', trackSearchTpl);
    $templateCache.put('templates/track-search/track-search-results.html', trackSearchResultsTpl);
    $templateCache.put('templates/user/user-menu.html', userMenuTpl);
    $templateCache.put('templates/user/user-profile.html', userProfileTpl);
    $templateCache.put('templates/user/user-profile-menu.html', userProfileMenuTpl);
  }]);
  
  return module;
});
