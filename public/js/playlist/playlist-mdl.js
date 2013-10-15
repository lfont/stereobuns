/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function PlaylistMdl ($rootScope, $q, $timeout, cacheFactory,
                        playlistSrv, userMdl) {

    function resolveWhenAllDone (event, name, promises) {
      var deferred = $q.defer(),
          expectedResponse = promises.length,
          tracks = [],
          i, len;
      
      function resolveIfDone () {
        var i, len;
        
        if (--expectedResponse === 0) {
          for (i = 0, len = tracks.length; i < len; i++) {
            $rootScope.$broadcast(
              'playlist:' + event,
              name,
              tracks[i]);
          }
          deferred.resolve(tracks);
        }
      }
      
      function onSuccess (track) {
        if (track) {
          tracks.push(track);
        }
        
        resolveIfDone();
      }

      function onError () {
        resolveIfDone();
      }
      
      for (i = 0, len = promises.length; i < len; i++) {
        promises[i].then(onSuccess, onError);
      }
      
      return deferred.promise;
    }
      
    function invokeForAll (method, event, name, tracks, withCopy) {
      var promises = [],
          i, len, trackBatch;

      if (!angular.isArray(tracks)) {
        trackBatch = [ tracks ];
      } else {
        trackBatch = tracks;
      }

      for (i = 0, len = trackBatch.length; i < len; i++) {
        promises.push(playlistSrv[method](
          name,
          withCopy ? $rootScope.utils.copy(trackBatch[i]) : trackBatch[i]));
      }

      return resolveWhenAllDone(event, name, promises);
    }
    
    function Playlist (userNickname, playlistInfo) {
      var _this = this;

      this.name = playlistInfo.name;
      this.length = playlistInfo.length;
      
      this.getTracks = function () {
        return playlistSrv
          .getPlaylistTracks(userNickname, this.name)
          .then(function (tracks) {
            _this.length = tracks.length;
            return tracks;
          });
      };

      this.add = function (tracks) {
        return invokeForAll('addToPlaylist', 'add', this.name, tracks, true)
          .then(function (tracks) {
            _this.length += tracks.length;
            return tracks;
          });
      };
  
      this.remove = function (tracks) {
        return invokeForAll('removeFromPlaylist', 'remove', this.name, tracks)
          .then(function (tracks) {
            _this.length -= tracks.length;
            return tracks;
          });
      };
    }

    this.getAll = function (userNickname) {
      var nickname = userMdl.resolveNickname(userNickname),
          cache    = cacheFactory(nickname);
          
      return playlistSrv
        .getPlaylists(nickname)
        .then(function (playlistInfos) {
          var i, len, name, playlist;
          
          for (i = 0, len = playlistInfos.length; i < len; i++) {
            name = playlistInfos[i].name.toLowerCase();
            if (!cache.get(name)) {
              playlist = new Playlist(nickname, playlistInfos[i]);
              cache.put(name, playlist);
            }
          }
          
          return cache.values();
        });
    };
    
    this.get = function (userNickname, name) {
      var nickname = userMdl.resolveNickname(userNickname),
          cache    = cacheFactory(nickname);
          
      if (!cache.get(name)) {
        return this
          .getAll(nickname) // ensure that all playlists are loaded
          .then(function (playlists) {
            return cache.get(name);
          });
      }
      
      return $timeout(function () {
        return cache.get(name);
      }, 0);
    };
    
    this.create = function (name) {
      var cache = cacheFactory('me');
      
      return playlistSrv
        .createPlaylist(name)
        .then(function (isSuccess) {
          var playlist;
          
          if (isSuccess) {
            playlist = new Playlist('me', { name: name, length: 0 });
            cache.put(name.toLowerCase(), playlist);
            $rootScope.$broadcast('playlist:create', playlist);
            return playlist;
          }
          
          return null;
        });
    };
    
    this.delete = function (name) {
      var cache = cacheFactory('me');
      
      return playlistSrv
        .deletePlaylist(name)
        .then(function (isSuccess) {
          var cacheKey, playlist;
          
          if (isSuccess) {
            cacheKey = name.toLowerCase();
            playlist = cache.get(cacheKey);
            cache.remove(cacheKey);
            $rootScope.$broadcast('playlist:delete', playlist);
            return playlist;
          }
          
          return null;
        });
    };
  }

  PlaylistMdl.$inject = [ '$rootScope', '$q', '$timeout',
                          'cacheFactory', 'playlistSrv', 'userMdl' ];

  return PlaylistMdl;
});
