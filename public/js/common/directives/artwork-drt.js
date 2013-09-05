/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function artworkDrtFactory () {
  
    function getArtworkTitle (data) {
      var title = '';
      if (!data) {
        return title;
      }
      if (data.artist) {
        title += data.artist;
      }
      if (data.album) {
        title += (title ? ' - ' : '') + data.album;
      }
      if (data.name) {
        title += (title ? ' - ' : '') + data.name;
      }
      return title;
    }
    
    function getArtworkUrl (data) {
      if (data && data.artworkUrl) {
        return data.artworkUrl;
      }

      return '/img/album.png'; 
    }
  
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      template: '<img class="artwork" alt="{{ title }}" ng-src="{{ src }}">',
      
      link: function (scope, iElement, iAttrs) {
        scope.$watch('data', function (newData, oldData) {
          scope.title = getArtworkTitle(newData);
          scope.src = getArtworkUrl(newData);
        });
      }
    };
  }
  
  return artworkDrtFactory;
});
