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
            templateUrl: 'song-progress-drt.html',
            controller: 'SongProgressDrtCtrl',

            link: function (scope, iElement, iAttrs, controller) {
                var progress = iElement.find('.progress');
                progress.on('click', function (event) {
                    var total      = progress.width(),
                        position   = event.pageX - progress.offset().left,
                        percentage = Math.floor(position * 100 / total);

                    controller.setPlayingPercentage(percentage);
                });
            }
        };
    }

    return songProgressDrtFactory;
});
