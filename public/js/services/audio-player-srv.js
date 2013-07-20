/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function AudioPlayerSrv ($rootScope, $q, soundManagerSrv, songsMdl) {
    var _this            = this,
        queuedSongsStore = songsMdl.getSongsStore('queued'),
        repeat           = false,
        queueIndex       = 0,
        queue;

    function play (song) {
      queueIndex = queue.indexOf(song);
      if (queueIndex < 0) {
        queueIndex = queue.length;
        _this.enqueue(song);
      }
      soundManagerSrv.play(song.url);
    }

    function stop () {
      $rootScope.$broadcast('audioPlayer:stop');
      if(!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    }

    function destroySound (song) {
      var songIndex = queue.indexOf(song);
      soundManagerSrv.destroySound(song.url);
      queue.splice(songIndex, 1);
    }

    soundManagerSrv.onStop(stop);

    soundManagerSrv.onFinish(function () {
      if (!_this.next()) {
        if (repeat) {
          queueIndex = 0;
          _this.play();
        } else {
          stop();
        }
      }
    });

    soundManagerSrv.onHalfPlay(function () {
      var mostPlayedSongStore = songsMdl.getSongsStore('mostplayed');
      mostPlayedSongStore.add(queue[queueIndex]);
    });

    this.getStatus = function () {
      return {
        song: queue ? queue[queueIndex] : null,
        isPlaying: soundManagerSrv.isPlaying()
      };
    };

    this.getQueue = function () {
      var deferred = $q.defer(),
          promise = queuedSongsStore.songs();

      promise.then(function (songs) {
        queue = songs;
        // This must be a copy to prevent alteration
        // of the queue by other component.
        deferred.resolve(songs.slice(0));
      }, function (error) {
        // TODO: handle error
        deferred.resolve([]);
      });

      return deferred.promise;
    };

    this.enqueue = function (songs) {
      function innerEnqueue (startIndex) {
        var promise = queuedSongsStore.add(songs, { index: startIndex });
        promise.then(function (songs) {
          var i, len;
          for (i = 0, len = songs.length; i < len; i++) {
            queue.push(songs[i]);
          }
          $rootScope.$broadcast('audioPlayer:queue');
        }, function (error) {
          // TODO: handle error
        });
      }

      if (!queue) {
        this.getQueue().then(function () {
          innerEnqueue(queue.length);
        });
      } else {
        innerEnqueue(queue.length);
      }
    };

    this.dequeue = function (songs) {
      var promise = queuedSongsStore.remove(songs);
      promise.then(function (songs) {
        var i, len;
        for (i = 0, len = songs.length; i < len; i++) {
          destroySound(songs[i]);
        }
        $rootScope.$broadcast('audioPlayer:dequeue');
      }, function (error) {
        // TODO: handle error
      });
    };

    this.setPosition = function (position) {
      soundManagerSrv.setPosition(position);
    };

    this.play = function (song) {
      if (song) {
        play(song);
        return;
      }

      if (soundManagerSrv.resume()) {
        return;
      }

      if (!queue) {
        this.getQueue().then(function () {
          queueIndex = 0;
          if (queue.length) {
            play(queue[queueIndex]);
          }
        });
        return;
      }

      if (queue.length) {
        play(queue[queueIndex]);
      }
    };

    this.pause = function () {
      soundManagerSrv.pause();
    };

    this.previous = function () {
      if (queueIndex - 1 > -1) {
        play(queue[--queueIndex]);
        return true;
      }
      return false;
    };

    this.next = function () {
      if (queueIndex + 1 < queue.length) {
        play(queue[++queueIndex]);
        return true;
      }
      return false;
    };

    this.toggleRepeat = function (shouldRepeat) {
      repeat = shouldRepeat;
    };
  }

  AudioPlayerSrv.$inject = [ '$rootScope', '$q', 'soundManagerSrv', 'songsMdl' ];

  return AudioPlayerSrv;
});
