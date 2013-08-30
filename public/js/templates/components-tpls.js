/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'text!partials/song-drt.html',
  'text!partials/songs-actions-drt.html',
  'text!partials/playlist-chooser-drt.html',
  'text!partials/song-progress-drt.html',
  'text!partials/user-profile-drt.html',
  'text!partials/user-profile-menu-drt.html'
], function (angular,
             songDrtTemplate, songsActionsDrtTemplate,
             playlistChooserDrtTemplate, songProgressDrtTemplate,
             userProfileDrtTemplate, userProfileMenuDrtTemplate) {
  'use strict';

  var componentsTemplateModule = angular.module('soundrocket.templates.components', []);

  componentsTemplateModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('song-drt.html', songDrtTemplate);
    $templateCache.put('songs-actions-drt.html', songsActionsDrtTemplate);
    $templateCache.put('playlist-chooser-drt.html', playlistChooserDrtTemplate);
    $templateCache.put('song-progress-drt.html', songProgressDrtTemplate);
    $templateCache.put('user-profile-drt.html', userProfileDrtTemplate);
    $templateCache.put('user-profile-menu-drt.html', userProfileMenuDrtTemplate);
  }]);

  return componentsTemplateModule;
});
