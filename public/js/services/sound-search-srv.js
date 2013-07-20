/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'socket.io'
], function (socketio) {
  'use strict';

  function SoundSearchSrv ($rootScope) {
    var socket = socketio.connect('/'),
        qid;

    socket.on('searchResult', function (result) {
      if (result.qid !== qid) {
        return;
      }

      $rootScope.$broadcast('soundSearch:result', result);
      $rootScope.$apply();
    });

    this.search = function (searchString) {
      qid = Date.now().toString();
      socket.emit('searchQuery', qid, searchString);
    };
  }

  SoundSearchSrv.$inject = [ '$rootScope' ];

  return SoundSearchSrv;
});
