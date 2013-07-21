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

    function apply () {
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    }

    function play (song) {
      queueIndex = queue.indexOf(song);
      if (queueIndex < 0) {
        _this.enqueue(song).then(function () {
          queueIndex = queue.length - 1;
          soundManagerSrv.play(song.url);
        });
      } else {
        soundManagerSrv.play(song.url);
      }
    }

    function stop () {
      $rootScope.$broadcast('audioPlayer:stop');
      apply();
    }

    function destroySound (song) {
      var songIndex = queue.indexOf(song);
      queue.splice(songIndex, 1);
      soundManagerSrv.destroySound(song.url);
    }

    soundManagerSrv.on('playing', function (progress) {
      $rootScope.$broadcast('audioPlayer:playing', progress);
      apply();
    });

    soundManagerSrv.on('loading', function (percentage) {
      $rootScope.$broadcast('audioPlayer:loading', percentage);
      apply();
    });

    soundManagerSrv.on('play', function (loaded) {
      $rootScope.$broadcast('audioPlayer:play', loaded);
      apply();
    });

    soundManagerSrv.on('pause', function () {
      $rootScope.$broadcast('audioPlayer:pause');
      apply();
    });

    soundManagerSrv.on('resume', function () {
      $rootScope.$broadcast('audioPlayer:resume');
      apply();
    });

    soundManagerSrv.on('stop', stop);

    soundManagerSrv.on('halfPlay', function (playTime) {
      var mostPlayedSongStore = songsMdl.getSongsStore('mostplayed');
      mostPlayedSongStore.add(queue[queueIndex]);
    });

    soundManagerSrv.on('finish', function () {
      if (!_this.next()) {
        if (repeat) {
          queueIndex = 0;
          _this.play();
        } else {
          stop();
        }
      }
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
      var deferred = $q.defer();

      function innerEnqueue (startIndex) {
        var promise = queuedSongsStore.add(songs, { index: startIndex });
        promise.then(function (songs) {
          var i, len;
          for (i = 0, len = songs.length; i < len; i++) {
            queue.push(songs[i]);
          }
          $rootScope.$broadcast('audioPlayer:queue');
          deferred.resolve();
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

      return deferred.promise;
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
