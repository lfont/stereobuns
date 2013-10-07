/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function trackDrtFactory () {
  
    return {
      restrict: 'E',
      replace: true,
      scope: {
        customOptions: '=options',
        track: '=',
        onRemove: '&'
      },
      templateUrl: 'templates/track/track.html',
      controller: 'TrackCtrl'
    };
  }
  
  return trackDrtFactory;
});
