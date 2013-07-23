/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function songsMdlFactory ($rootScope, $q, $http, $window) {
    var songsStoresMap = {},
        songsStores    = [];

    function SongsStore (id, name, icon) {
      var _this = this;

      function addOne (song, params) {
        var deferred = $q.defer();
        delete song._id;
        $http
          .post('/api/users/me/songs/' + _this.id, { song: song, params: params })
          .success(function (data, status, headers, config) {
            if (data.count !== 0) {
              _this.length++;
              $rootScope.$broadcast('songsStore:add', _this.id, song);
              deferred.resolve(song);
              $window.console.log('song: ' + song.url + ' has been added.');
            }
          })
          .error(function (data, status, headers, config) {
            // TODO: handle error
            deferred.reject(status);
            $window.console.log('song: ' + song.url + ' has not been added.');
          });
        return deferred.promise;
      }

      function removeOne (song) {
        var deferred = $q.defer();
        delete song._id;
        $http
            .put('/api/users/me/songs/' + _this.id, song)
            .success(function (data, status, headers, config) {
              if (data.count !== 0) {
                _this.length--;
                $rootScope.$broadcast('songsStore:remove', _this.id, song);
                deferred.resolve(song);
                $window.console.log('song: ' + song.url + ' has been removed.');
              }
            })
            .error(function (data, status, headers, config) {
              // TODO: handle error
              deferred.reject(status);
              $window.console.log('song: ' + song.url + ' has not been removed.');
            });
        return deferred.promise;
      }

      this.id = id;
      this.name = name;
      this.icon = icon;
      this.length = 0;

      this.songs = function () {
        var deferred = $q.defer();
        $http
          .get('/api/users/me/songs/' + this.id)
          .success(function (data, status, headers, config) {
            _this.length = data.songs.length;
            deferred.resolve(data.songs);
          })
          .error(function (data, status, headers, config) {
            deferred.reject(status);
          });
        return deferred.promise;
      };

      this.add = function (songs) {
        var deferred   = $q.defer(),
            addedSongs = [],
            params     = Array.prototype.slice.call(arguments, 1)[0],
            expectedCount, i, len, newSongs;

        function onSongAdded (song) {
          addedSongs.push(song);
          if (addedSongs.length === expectedCount) {
            deferred.resolve(addedSongs);
          }
        }

        function onError (error) {
          expectedCount--;
        }

        if (!angular.isArray(songs)) {
          newSongs = [ songs ];
        } else {
          newSongs = songs;
        }
        expectedCount = newSongs.length;
        for (i = 0, len = newSongs.length; i < len; i++) {
          addOne.call(this, newSongs[i], params).then(onSongAdded, onError);
          if (this.id === 'queued' && params.index) {
            // TODO: This is not required if the backend can handle
            // batch operation
            params = angular.extend({}, params);
            params.index++;
          }
        }

        return deferred.promise;
      };

      this.remove = function (songs) {
        var deferred     = $q.defer(),
            removedSongs = [],
            expectedCount, i, len, oldSongs;

        function onSongRemoved (song) {
          removedSongs.push(song);
          if (removedSongs.length === expectedCount) {
            deferred.resolve(removedSongs);
          }
        }

        function onError (error) {
          expectedCount--;
        }

        if (!angular.isArray(songs)) {
          oldSongs = [ songs ];
        } else {
          oldSongs = songs;
        }
        expectedCount = oldSongs.length;
        for (i = 0, len = oldSongs.length; i < len; i++) {
          removeOne(oldSongs[i]).then(onSongRemoved, onError);
        }

        return deferred.promise;
      };
    }

    return {
      getSongsStores: function () {
        if (!songsStoresMap.loved) {
          songsStoresMap.loved = new SongsStore('loved', 'Loved', 'icon-heart');
          songsStores.push(songsStoresMap.loved);
        }
        if (!songsStoresMap.mostplayed) {
          songsStoresMap.mostplayed = new SongsStore('mostplayed', 'Most Played', 'icon-music');
          songsStores.push(songsStoresMap.mostplayed);
        }
        if (!songsStoresMap.queued) {
          songsStoresMap.queued = new SongsStore('queued', 'Queue');
        }
        return songsStores;
      },

      getSongsStore: function (id) {
        this.getSongsStores(); // ensure that all stores are loaded
        return songsStoresMap[id];
      }
    };
  }

  songsMdlFactory.$inject = [ '$rootScope', '$q', '$http', '$window' ];

  return songsMdlFactory;
});
