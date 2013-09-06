/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';
  
  function songsActionsDrtFactory () {

    return {
      restrict: 'E',
      replace: true,
      scope: {
        customOptions: '=options',
        songs: '=',
        onRemove: '&'
      },
      templateUrl: 'templates/songs-actions-drt.html',
      controller: 'SongsActionsDrtCtrl'
    };
  }
  
  return songsActionsDrtFactory;
});
