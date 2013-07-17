/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'soundmanager2'
], function (angular, soundManager) {
  'use strict';

  function audioPlayerSrvFactory ($rootScope, $window, audioPlayerSoundSrv) {
    var isReady = false,
        currentSoundId = null,
        soundUrlsToIds = {},
        queue = [],
        queueIndex = 0,
        isPlaying = false,
        repeat = false;

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
          song: queue[queueIndex],
          isPlaying: isPlaying
        };
      },

      getQueue: function () {
        return queue;
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

      enqueue: function (song) {
        if (!angular.isArray(song)) {
          queue.push(song);
        } else {
          Array.prototype.push.apply(queue, song);
        }
      },

      dequeue: function (song) {
        var oldSongs = [],
            i, len;
        if (!angular.isArray(song)) {
          oldSongs.push(song);
        } else {
          // we make a copy of the array because
          // the given array could be a reference of
          // the queue array.
          oldSongs = oldSongs.concat(song);
        }
        for (i = 0, len = oldSongs.length; i < len; i++) {
          destroySound(oldSongs[i]);
        }
        $rootScope.$broadcast('audioPlayer:dequeue');
      },

      play: function (song) {
        var soundId;

        if (!isReady) {
          return;
        }

        if (!song) {
          if (currentSoundId) {
            isPlaying = true;
            soundManager.resume(currentSoundId);
            return;
          }

          if (queue.length) {
            song = queue[queueIndex];
          }
        }

        if (song) {
          if (currentSoundId) {
            soundManager.stop(currentSoundId);
          }

          queueIndex = queue.indexOf(song);
          if (queueIndex < 0) {
            queueIndex = queue.length;
            this.enqueue([ song ]);
          }

          soundId = getSoundId(song);
          if (!soundId) {
            soundId = createSound(song);
          }

          isPlaying = true;
          currentSoundId = soundId;
          soundManager.play(soundId, audioPlayerSoundSrv.getEventsHandler());
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
      console.log('********half play');
    });

    return audioPlayerSrv;
  }

  audioPlayerSrvFactory.$inject = [ '$rootScope', '$window', 'audioPlayerSoundSrv' ];

  return audioPlayerSrvFactory;
});
