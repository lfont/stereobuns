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
                iElement.find('.progress').on('click', function (event) {
                    console.log(event.pageX - iElement.offset().left);
                });
            }
        };
    }

    return songProgressDrtFactory;
});
