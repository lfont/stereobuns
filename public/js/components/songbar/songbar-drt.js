/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function songbarDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'songbar-drt.html',
            controller: 'SongbarDrtCtrl',
            
            link: function (scope, iElement, iAttrs, controller) {
                iAttrs.$observe('allSongs', function (value) {
                    scope.$parent.$watch(value, function (newSongs, oldSongs) {
                        scope.songs = newSongs;
                    });
                });
                
                iAttrs.$observe('selectedSongs', function (value) {
                    scope.selectedSongs = scope.$parent.$eval(value);
                });
                
                iAttrs.$observe('options', function (value) {
                    controller.setOptions(scope.$parent.$eval(value));
                });
                
                iAttrs.$observe('onRemove', function (value) {
                    scope.onRemove = scope.$parent.$eval(value);
                });
            }
        };
    }
    
    return songbarDrtFactory;
});
