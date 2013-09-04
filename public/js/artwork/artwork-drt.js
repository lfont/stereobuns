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
      template: '<img class="artwork" alt="{{ title }}" ng-src="{{ src }}">',
      
      link: function (scope, iElement, iAttrs) {
        var setter = {
          song: function (song) {
            scope.title = song ?
              song.artist + ' - ' + song.track :
              'none';
          },
          
          track: function (track) {
            scope.title = track ?
              track.artist + ' - ' + track.name :
              'none';
          },
          
          album: function (album) {
            scope.title = album ?
              album.artist + ' - ' + album.name :
              'none';
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
