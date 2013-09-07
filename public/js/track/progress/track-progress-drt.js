/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function trackProgressDrtFactory () {

    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'templates/track/progress/track-progress.html',
      controller: 'TrackProgressCtrl',

      link: function (scope, iElement, iAttrs, controller) {
        iElement.on('click', function (event) {
          var total      = this.clientWidth,
              position   = event.pageX - this.getBoundingClientRect().left,
              percentage = Math.floor(position * 100 / total);

          controller.setPlayingPercentage(percentage);
        });
      }
    };
  }

  return trackProgressDrtFactory;
});
