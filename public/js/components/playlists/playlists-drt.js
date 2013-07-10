/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function playlistsDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'playlists-drt.html',
            controller: 'PlaylistsDrtCtrl',
            
            link: function (scope, iElement, iAttrs, controller) {
                iAttrs.$observe('options', function (value) {
                    controller.setOptions(scope.$parent.$eval(value));
                });
            }
        };
    }
    
    return playlistsDrtFactory;
});
