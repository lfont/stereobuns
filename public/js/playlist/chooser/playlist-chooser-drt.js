/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function playlistChooserDrtFactory () {

    return {
      restrict: 'E',
      replace: true,
      scope: {
        options: '=',
        tracks: '='
      },
      templateUrl: 'templates/playlist/chooser/playlist-chooser.html',
      controller: 'PlaylistChooserCtrl'
    };
  }
  
  return playlistChooserDrtFactory;
});
