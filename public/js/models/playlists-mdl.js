/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistsMdl ($rootScope, $window, $http, playlistMdl) {
    var playlistMap = {},
        playlists   = [];

    this.getAll = function () {
      return $http
        .get('/api/users/me/playlists', { cache: true })
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('get all playlist failed!');
        })
        .then(function (response) {
          var playlistInfos = response.data,
              i, len, name;

          if (!playlists.length) {
            for (i = 0, len = playlistInfos.length; i < len; i++) {
              name = playlistInfos[i].name.toLowerCase();
              playlistMap[name] = playlistMdl.get(playlistInfos[i]);
              playlists.push(playlistMap[name]);
            }
          }

          return playlists;
        });
    };

    this.get = function (name) {
      return this
        .getAll()
        .then(function (playlists) {
          return playlistMap[name];
        });
    };

    this.create = function (name) {
      return $http
        .post('/api/users/me/playlists', { name: name })
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + name + ' has not been created');
        })
        .then(function (response) {
          var playlist = playlistMdl.get({
            name: name,
            length: 0
          });

          playlistMap[playlist.name.toLowerCase()] = playlist;
          playlists.push(playlist);

          $window.console. log('playlist: ' + name + ' has been created');
          $rootScope.$broadcast('playlistsMdl:create', playlist);
          return playlist;
        });
    };

    this.delete = function (playlist) {
      return $http
        .delete('/api/users/me/playlists/' + playlist.name)
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + playlist.name + ' has not been removed');
        })
        .then(function (response) {
          var index = playlists.indexOf(playlist);

          delete playlistMap[playlist.name.toLowerCase()];
          playlists.splice(index, 1);

          $window.console.log('playlist: ' + playlist.name + ' has been removed');
          $rootScope.$broadcast('playlistsMdl:delete', playlist);
          return playlist;
        });
    };
  }

  PlaylistsMdl.$inject = [ '$rootScope', '$window', '$http', 'playlistMdl' ];

  return PlaylistsMdl;
});
