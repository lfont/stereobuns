/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function ArtworkDrtFactory (artworkSrv) {
        
        return {
            restrict: 'E',
            replace: true,
            scope: {
                song: '@'
            },
            template: '<img ng-src="{{ src }}" class="{{ class }}" />',
            
            link: function (scope, iElement, iAttrs) {
                scope.$watch('song', function (newValue, oldValue) {
                    if (newValue) {
                        scope.$parent.$watch(scope.song, function (newSong, oldSong) {
                            if (newSong) {
                                var url = artworkSrv.getSongArtwork(newSong);
                                scope.class = 'song-artwork';
                                scope.src = url;
                            }
                        });
                    }
                });
            }
        };
    }
    
    ArtworkDrtFactory.$inject = [ 'artworkSrv' ];
    
    return ArtworkDrtFactory;
});
