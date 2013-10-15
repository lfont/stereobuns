/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function TrackGroupMdl ($rootScope, $q, cacheFactory, trackGroupSrv, userMdl) {
    
    function resolveWhenAllDone (event, group, promises) {
      var deferred = $q.defer(),
          expectedResponse = promises.length,
          tracks = [],
          i, len;
      
      function resolveIfDone () {
        var i, len;
        
        if (--expectedResponse === 0) {
          for (i = 0, len = tracks.length; i < len; i++) {
            $rootScope.$broadcast(
              'trackGroup:' + event,
              group,
              tracks[i]);
          }
          deferred.resolve(tracks);
        }
      }
      
      function onSuccess (track) {
        if (track) {
          if (group === 'loved') {
            track.loved = (event === 'add');
          }
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

    function invokeForAll(method, group, tracks) {
      var promises = [],
          i, len, trackBatch;

      if (!angular.isArray(tracks)) {
        trackBatch = [ tracks ];
      } else {
        trackBatch = tracks;
      }

      for (i = 0, len = trackBatch.length; i < len; i++) {
        promises.push(trackGroupSrv[method](
          group,
          $rootScope.utils.copy(trackBatch[i])));
      }

      return resolveWhenAllDone(method, group, promises);
    }

    function TrackGroup (trackGroupInfo) {
      var _this = this;
  
      this.id = trackGroupInfo.id;
      this.name = trackGroupInfo.name;
      this.icon = trackGroupInfo.icon;
      this.length = 0;
      
      this.getTracks = function (userNickname) {
        var nickname = userMdl.resolveNickname(userNickname);
        return trackGroupSrv
          .getTracks(nickname, this.id)
          .then(function (tracks) {
            _this.length = tracks.length;
            return tracks;
          });
      };

      this.add = function (tracks) {
        return invokeForAll('add', this.id, tracks)
          .then(function (tracks) {
            _this.length += tracks.length;
            return tracks;
          });
      };
  
      this.remove = function (tracks) {
        return invokeForAll('remove', this.id, tracks)
          .then(function (tracks) {
            _this.length -= tracks.length;
            return tracks;
          });
      };
    }

    this.getAll = function () {
      var cache = cacheFactory('all');
      
      if (!cache.get('loved')) {
        cache.put('loved', new TrackGroup({
          id: 'loved',
          name: 'Loved',
          icon: 'icon-heart'
        }));
      }

      if (!cache.get('mostplayed')) {
        cache.put('mostplayed', new TrackGroup({
          id: 'mostplayed',
          name: 'Most Played',
          icon: 'icon-music'
        }));
      }

      if (!cache.get('queued')) {
        cache.put('queued', new TrackGroup({
          id: 'queued',
          name: 'Queue'
        }), true);
      }

      return cache.values();
    };

    this.get = function (id) {
      var cache = cacheFactory('all');
      this.getAll(); // ensure that all groups are loaded
      return cache.get(id);
    };
  }

  TrackGroupMdl.$inject = [ '$rootScope', '$q', 'cacheFactory',
                            'trackGroupSrv', 'userMdl' ];

  return TrackGroupMdl;
});
