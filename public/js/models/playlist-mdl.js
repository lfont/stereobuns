/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistMdl ($rootScope, $window, $http, playlistStoreMdl) {
    var playlistStoresMap = {},
        playlistStores    = [];

    this.getPlaylistStores = function () {
      return $http
        .get('/api/users/me/playlists', { cache: true })
        .error(function (data, status, headers, config) {
          // TODO: handle error
        })
        .then(function (response) {
          var playlists = response.data,
              i, len, name;

          if (!playlistStores.length) {
            for (i = 0, len = playlists.length; i < len; i++) {
              name = playlists[i].name.toLowerCase();
              playlistStoresMap[name] = playlistStoreMdl.create(playlists[i]);
              playlistStores.push(playlistStoresMap[name]);
            }
          }

          return playlistStores;
        });
    };

    this.getPlaylistStore = function (name) {
      return this
        .getPlaylistStores()
        .then(function (playlistStores) {
          return playlistStoresMap[name];
        });
    };

    this.createPlaylistStore = function (name) {
      return $http
        .post('/api/users/me/playlists', { name: name })
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + name + ' has not been created');
        })
        .then(function (response) {
          var playlistStore = playlistStoreMdl.create({
            name: name,
            length: 0
          });

          playlistStoresMap[playlistStore.name.toLowerCase()] = playlistStore;
          playlistStores.push(playlistStore);

          $window.console. log('playlist: ' + name + ' has been created');
          $rootScope.$broadcast('playlistMdl:create', playlistStore);
          return playlistStore;
        });
    };

    this.deletePlaylistStore = function (playlistStore) {
      return $http
        .delete('/api/users/me/playlists/' + playlistStore.name)
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + playlistStore.name + ' has not been removed');
        })
        .then(function (response) {
          var index = playlistStores.indexOf(playlistStore);

          delete playlistStoresMap[playlistStore.name.toLowerCase()];
          playlistStores.splice(index, 1);

          $window.console.log('playlist: ' + playlistStore.name + ' has been removed');
          $rootScope.$broadcast('playlistMdl:delete', playlistStore);
          return playlistStore;
        });
    };
  }

  PlaylistMdl.$inject = [ '$rootScope', '$window', '$http', 'playlistStoreMdl' ];

  return PlaylistMdl;
});
