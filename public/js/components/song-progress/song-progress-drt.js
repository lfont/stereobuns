/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function songProgressDrtFactory () {

    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'templates/song-progress-drt.html',
      controller: 'SongProgressDrtCtrl',

      link: function (scope, iElement, iAttrs, controller) {
        iElement.on('click', function (event) {
          var total      = iElement.width(),
              position   = event.pageX - iElement.offset().left,
              percentage = Math.floor(position * 100 / total);

          controller.setPlayingPercentage(percentage);
        });
      }
    };
  }

  return songProgressDrtFactory;
});
