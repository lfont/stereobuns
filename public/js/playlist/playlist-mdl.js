/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function PlaylistMdl ($rootScope, $q, $timeout, playlistSrv) {
    var playlistMap = {},
        playlists   = [];
    
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
      
    function invokeForAll(method, event, name, tracks, withCopy) {
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
    
    function Playlist (user, playlistInfo) {
      var _this = this;

      this.name = playlistInfo.name;
      this.length = playlistInfo.length;
      
      this.getTracks = function () {
        return playlistSrv
          .getPlaylistTracks(user, this.name)
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

    this.getAll = function () {
      var user = 'me';
      
      return playlistSrv
        .getPlaylists(user)
        .then(function (playlistInfos) {
          var i, len, name;
          
          for (i = 0, len = playlistInfos.length; i < len; i++) {
            name = playlistInfos[i].name.toLowerCase();
            if (!playlistMap[name]) {
              playlistMap[name] = new Playlist(user, playlistInfos[i]);
              playlists.push(playlistMap[name]);
            }
          }
          
          return playlists;
        });
    };
    
    this.get = function (user, name) {
      if (playlistMap[name]) {
        return $timeout(function () {
          return playlistMap[name];
        }, 0);
      } else {
        return this
          .getAll() // ensure that all playlists are loaded
          .then(function (playlists) {
            return playlistMap[name];
          });
      }
    };
    
    this.create = function (name) {
      return playlistSrv
        .createPlaylist(name)
        .then(function (isSuccess) {
          var playlist;
          
          if (isSuccess) {
            playlist = new Playlist('me', { name: name, length: 0 });
            playlistMap[name.toLowerCase()] = playlist;
            playlists.push(playlist);
            $rootScope.$broadcast('playlist:create', playlist);
            return playlist;
          }
          
          return null;
        });
    };
    
    this.delete = function (name) {
      return playlistSrv
        .deletePlaylist(name)
        .then(function (isSuccess) {
          var playlistMapName, playlistIndex, playlist;
          
          if (isSuccess) {
            playlistMapName = name.toLowerCase();
            playlist = playlistMap[playlistMapName];
            delete playlistMap[playlistMapName];
            playlistIndex = playlists.indexOf(playlist);
            playlists.splice(playlistIndex, 1);
            $rootScope.$broadcast('playlist:delete', playlist);
            return playlist;
          }
          
          return null;
        });
    };
  }

  PlaylistMdl.$inject = [ '$rootScope', '$q', '$timeout', 'playlistSrv' ];

  return PlaylistMdl;
});
