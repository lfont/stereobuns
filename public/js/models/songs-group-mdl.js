/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function SongsGroupMdl ($rootScope, $window, $http, $q, songUtilsSrv) {

    function SongsGroup (songsGroupInfo) {
      var _this = this;

      this.id = songsGroupInfo.id;
      this.name = songsGroupInfo.name;
      this.icon = songsGroupInfo.icon;
      this.length = 0;

      function addOne (song) {
        return $http
          .post('/api/users/me/songs/' + _this.id, songUtilsSrv.copy(song))
          .error(function (data, status, headers, config) {
            // TODO: handle error
            $window.console.log('song: ' + song.url + ' has not been added.');
          })
          .then(function (response) {
            if (response.data.count !== 0) {
              _this.length++;

              $window.console.log('song: ' + song.url + ' has been added.');
              $rootScope.$broadcast('songsGroup:add', _this.id, song);
              return song;
            }
          });
      }

      function removeOne (song) {
        return $http
          .put('/api/users/me/songs/' + _this.id, songUtilsSrv.copy(song))
          .error(function (data, status, headers, config) {
            // TODO: handle error
            $window.console.log('song: ' + song.url + ' has not been removed.');
          })
          .then(function (response) {
            if (response.data.count !== 0) {
              _this.length--;

              $window.console.log('song: ' + song.url + ' has been removed.');
              $rootScope.$broadcast('songsGroup:remove', _this.id, song);
              return song;
            }
          });
      }

      this.songs = function () {
        return $http
          .get('/api/users/me/songs/' + this.id)
          .error(function (data, status, headers, config) {
            // TODO: handle error
            $window.console.log('get songs failed for group: ' + _this.name);
          })
          .then(function (response) {
            _this.length = response.data.songs.length;
            return response.data.songs;
          });
      };

      this.add = function (songs) {
        var promises = [],
            i, len, newSongs;

        if (!angular.isArray(songs)) {
          newSongs = [ songs ];
        } else {
          newSongs = songs;
        }

        for (i = 0, len = newSongs.length; i < len; i++) {
          promises.push(addOne(newSongs[i]));
        }

        return $q.all(promises);
      };

      this.remove = function (songs) {
        var promises = [],
            i, len, oldSongs;

        if (!angular.isArray(songs)) {
          oldSongs = [ songs ];
        } else {
          oldSongs = songs;
        }

        for (i = 0, len = oldSongs.length; i < len; i++) {
          promises.push(removeOne(oldSongs[i]));
        }

        return $q.all(promises);
      };
    }

    this.get = function (songsGroupInfo) {
      return new SongsGroup(songsGroupInfo);
    };
  }

  SongsGroupMdl.$inject = [ '$rootScope', '$window',
                            '$http', '$q',
                            'songUtilsSrv' ];

  return SongsGroupMdl;
});
