/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function ArtworkSrv () {
    
    this.getArtworkUrl = function (data) {
      if (data && data.artworkUrl) {
        return data.artworkUrl;
      }

      // TODO: try to get the artwork elsewhere
      return '/img/120_album.png';
    };
  }

  return ArtworkSrv;
});
