/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function artworkDrtFactory (artworkSrv) {
        
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            template: '<img alt="{{ alt }}" ng-src="{{ src }}" ng-style="style" />',
            
            link: function (scope, iElement, iAttrs) {
                iAttrs.$observe('song', function (value) {
                    scope.$parent.$watch(value, function (newSong, oldSong) {
                        var url = artworkSrv.getSongArtwork(newSong);
                        scope.alt = newSong ?
                            newSong.artist + ' - ' + newSong.track :
                            'none';
                        // TODO: the artwork service should returns resized image.
                        scope.style = { width: '64px', height: '64px' };
                        scope.src = url;
                    });
                });
            }
        };
    }
    
    artworkDrtFactory.$inject = [ 'artworkSrv' ];
    
    return artworkDrtFactory;
});
