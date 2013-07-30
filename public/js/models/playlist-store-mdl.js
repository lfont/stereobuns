/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function PlaylistStoreMdl ($rootScope, $window, $http) {
    function sanitizeSong (song) {
      var newSong = angular.copy(song);
      delete newSong._id;
      return newSong;
    }

    function PlaylistStore (playlist) {
      var _this = this;

      this.name = playlist.name;
      this.length = playlist.length;

      function addOne (song) {
        $http
            .post('/api/users/me/playlists/' + _this.name + '/songs', sanitizeSong(song))
            .success(function (data, status, headers, config) {
              if (data.count !== 0) {
                _this.length++;
                $rootScope.$broadcast('playlistStore:add', _this.name, song);
                $window.console.log('song: ' + song.url + ' has been added to ' + _this.name);
              }
            })
            .error(function (data, status, headers, config) {
              // TODO: handle error
              $window.console.log('song: ' + song.url + ' has not been added to ' + _this.name);
            });
      }

      function removeOne (song) {
        $http
            .delete('/api/users/me/playlists/' + _this.name + '/songs/' + song._id)
            .success(function (data, status, headers, config) {
              if (data.count !== 0) {
                _this.length--;
                $rootScope.$broadcast('playlistStore:remove', _this.name, song);
                $window.console.log('song: ' + song.url + ' has been removed from ' + _this.name);
              }
            })
            .error(function (data, status, headers, config) {
              // TODO: handle error
              $window.console.log('song: ' + song.url + ' has not been removed from ' + _this.name);
            });
      }

      this.songs = function () {
        return $http
          .get('/api/users/me/playlists/' + this.name)
          .error(function (data, status, headers, config) {
            // TODO: handle error
          })
          .then(function (response) {
            _this.length = response.data.songs.length;
            return response.data.songs;
          });
      };

      this.add = function (songs) {
        var i, len, newSongs;
        if (!angular.isArray(songs)) {
          newSongs = [ songs ];
        } else {
          newSongs = songs;
        }
        for (i = 0, len = newSongs.length; i < len; i++) {
          addOne(newSongs[i]);
        }
      };

      this.remove = function (songs) {
        var i, len, oldSsongs;
        if (!angular.isArray(songs)) {
          oldSsongs = [ songs ];
        } else {
          // the array must be duplicated because it can be
          // altered during the iteration.
          oldSsongs = songs.slice(0);
        }
        for (i = 0, len = oldSsongs.length; i < len; i++) {
          removeOne(oldSsongs[i]);
        }
      };
    }

    this.create = function (playlist) {
      return new PlaylistStore(playlist);
    };
  }

  PlaylistStoreMdl.$inject = [ '$rootScope', '$window', '$http' ];

  return PlaylistStoreMdl;
});
