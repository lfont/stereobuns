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

      this.add = function (song) {
        $http
          .post('/api/users/me/songs/' + this.id, song)
          .success(function (data, status, headers, config) {
            if (data.count !== 0) {
              _this.length++;
              $rootScope.$broadcast('songsStore:add', _this.id, song);
              $window.console.log('song: ' + song.url + ' has been added.');
            }
          })
          .error(function (data, status, headers, config) {
            // TODO: handle error
            $window.console.log('song: ' + song.url + ' has not been added.');
          });
      };

      this.remove = function (song) {
        $http
          .put('/api/users/me/songs/' + this.id, song)
          .success(function (data, status, headers, config) {
            if (data.count !== 0) {
              _this.length--;
              $rootScope.$broadcast('songsStore:remove', _this.id, song);
              $window.console.log('song: ' + song.url + ' has been removed.');
            }
          })
          .error(function (data, status, headers, config) {
            // TODO: handle error
            $window.console.log('song: ' + song.url + ' has not been removed.');
          });
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
