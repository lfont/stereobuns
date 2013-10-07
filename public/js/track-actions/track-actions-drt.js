/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';
  
  function trackActionsDrtFactory () {

    return {
      restrict: 'E',
      replace: true,
      scope: {
        customOptions: '=options',
        tracks: '=',
        onRemove: '&'
      },
      templateUrl: 'templates/track-actions/track-actions.html',
      controller: 'TrackActionsCtrl'
    };
  }
  
  return trackActionsDrtFactory;
});
