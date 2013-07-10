/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function songDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'song-drt.html',
            controller: 'SongDrtCtrl',
            
            link: function (scope, iElement, iAttrs, controller) {
                iAttrs.$observe('data', function (value) {
                    scope.song = scope.$parent.$eval(value);
                });
                
                iAttrs.$observe('options', function (value) {
                    controller.setOptions(scope.$parent.$eval(value));
                });
            }
        };
    }
    
    return songDrtFactory;
});
