/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'soundmanager2'
], function (angular, soundManager) {
  'use strict';

  function audioPlayerSrvFactory ($rootScope, $window, $q,
                                  audioPlayerSoundSrv, songsMdl) {
    var isReady = false,
        currentSoundId = null,
        soundUrlsToIds = {},
        queueIndex = 0,
        isPlaying = false,
        repeat = false,
        queuedSongsStore = songsMdl.getSongsStore('queued'),
        queue;

    soundManager.setup({
      url: '/components/soundmanager/swf/',
      flashVersion: 9,
      preferFlash: false,
      onready: function () {
        isReady = true;
      },
      ontimeout: function () {
        $window.alert('SM2 init failed!');
      },
      defaultOptions: {
        // set global default volume for all sound objects
        volume: 100
      }
    });

    function play (song) {
      var soundId;

      if (currentSoundId) {
        soundManager.stop(currentSoundId);
      }

      queueIndex = queue.indexOf(song);
      if (queueIndex < 0) {
        queueIndex = queue.length;
        audioPlayerSrv.enqueue(song);
      }

      soundId = getSoundId(song);
      if (!soundId) {
        soundId = createSound(song);
      }

      isPlaying = true;
      currentSoundId = soundId;
      soundManager.play(soundId, audioPlayerSoundSrv.getEventsHandler());
    }

    function stop () {
      isPlaying = false;
      $rootScope.$broadcast('audioPlayer:stop');
      if(!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    }

    function getSoundId (song) {
      return soundUrlsToIds[song.url];
    }

    function createSound (song) {
      var sound = soundManager.createSound({
        url: song.url
      });
      soundUrlsToIds[song.url] = sound.id;
      return sound.id;
    }

    function destroySound (song) {
      var soundId = soundUrlsToIds[song.url],
          songIndex = queue.indexOf(song);
      if (currentSoundId &&
        currentSoundId === soundId) {
        soundManager.stop(currentSoundId);
        currentSoundId = null;
      }
      soundManager.destroySound(soundId);
      delete soundUrlsToIds[song.url];
      queue.splice(songIndex, 1);
    }

    var audioPlayerSrv = {
      getStatus: function () {
        return {
          song: queue ? queue[queueIndex] : null,
          isPlaying: isPlaying
        };
      },

      getQueue: function () {
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
      },

      enqueue: function (songs) {
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
      },

      dequeue: function (songs) {
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
      },

      setPosition: function (position) {
        var song = queue[queueIndex],
            soundId;

        if (!song) {
          return;
        }

        soundId = getSoundId(song);
        soundManager.setPosition(soundId, position * 1000);
      },

      play: function (song) {
        if (!isReady) {
          return;
        }

        if (!song && currentSoundId) {
          isPlaying = true;
          soundManager.resume(currentSoundId);
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
      },

      pause: function () {
        if (!isReady || !currentSoundId) {
          return;
        }

        isPlaying = false;
        soundManager.pause(currentSoundId);
      },

      previous: function () {
        if (queueIndex - 1 > -1) {
          this.play(queue[--queueIndex]);
          return true;
        }
        return false;
      },

      next: function () {
        if (queueIndex + 1 < queue.length) {
          this.play(queue[++queueIndex]);
          return true;
        }
        return false;
      },

      toggleRepeat: function (shouldRepeat) {
        repeat = shouldRepeat;
      }
    };

    audioPlayerSoundSrv.onStop(stop);

    audioPlayerSoundSrv.onFinish(function () {
      if (!audioPlayerSrv.next()) {
        currentSoundId = null;
        if (repeat) {
          queueIndex = 0;
          audioPlayerSrv.play();
        } else {
          stop();
        }
      }
    });

    audioPlayerSoundSrv.onHalfPlay(function () {
      var mostPlayedSongStore = songsMdl.getSongsStore('mostplayed');
      mostPlayedSongStore.add(queue[queueIndex]);
    });

    return audioPlayerSrv;
  }

  audioPlayerSrvFactory.$inject = [ '$rootScope', '$window', '$q',
                                    'audioPlayerSoundSrv', 'songsMdl' ];

  return audioPlayerSrvFactory;
});
