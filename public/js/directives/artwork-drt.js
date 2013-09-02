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
      scope: {
        data: '=',
        type: '@'
      },
      template: '<img alt="{{ alt }}" ng-src="{{ src }}" ng-style="style" />',
      
      link: function (scope, iElement, iAttrs) {
        var setter = {
          song: function (song) {
            scope.alt = song ?
              song.artist + ' - ' + song.track :
              'none';
            scope.style = { width: '64px', height: '64px' };
          },
          
          track: function (track) {
            scope.alt = track ?
              track.artist + ' - ' + track.name :
              'none';
            scope.style = { width: '34px', height: '34px' };
          },
          
          album: function (album) {
            scope.alt = album ?
              album.artist + ' - ' + album.name :
              'none';
            scope.style = { width: '128px', height: '128px' };
          }
        };
        
        scope.$watch('data', function (newData, oldData) {
          setter[scope.type](newData);
          scope.src = artworkSrv.getArtworkUrl(newData);
        });
      }
    };
  }
  
  artworkDrtFactory.$inject = [ 'artworkSrv' ];
  
  return artworkDrtFactory;
});
