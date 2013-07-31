/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SongsGroupsMdl (songsGroupMdl) {
    var songsGroupMap = {},
        songsGroups   = [];

    this.getAll = function () {
      if (!songsGroupMap.loved) {
        songsGroupMap.loved = songsGroupMdl.get({
          id: 'loved',
          name: 'Loved',
          icon: 'icon-heart'
        });
        songsGroups.push(songsGroupMap.loved);
      }

      if (!songsGroupMap.mostplayed) {
        songsGroupMap.mostplayed = songsGroupMdl.get({
          id: 'mostplayed',
          name: 'Most Played',
          icon: 'icon-music'
        });
        songsGroups.push(songsGroupMap.mostplayed);
      }

      if (!songsGroupMap.queued) {
        songsGroupMap.queued = songsGroupMdl.get({
          id: 'queued',
          name: 'Queue'
        });
      }

      return songsGroups;
    };

    this.get = function (id) {
      this.getAll(); // ensure that all groups are loaded
      return songsGroupMap[id];
    };
  }

  SongsGroupsMdl.$inject = [ 'songsGroupMdl' ];

  return SongsGroupsMdl;
});
