/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'soundmanager2'
], function (soundManager) {
  'use strict';

  function SoundManagerSrv ($window, config, soundSrv) {
    var isPlaying      = false,
        soundUrlsToIds = {},
        currentSoundId;

    soundManager.setup({
      url: '/components/soundmanager/swf/',
      debugMode: config.isDebug,
      flashVersion: 9,
      preferFlash: false,
      ontimeout: function () {
        $window.alert('SM2 init failed!');
      },
      defaultOptions: {
        // set global default volume for all sound objects
        volume: 100
      }
    });

    function createSound (url) {
      var sound = soundManager.createSound({
        url: url
      });
      soundUrlsToIds[url] = sound.id;
      return sound.id;
    }

    function getSoundId (url) {
      return soundUrlsToIds[url];
    }

    function stop () {
      if (currentSoundId) {
        isPlaying = false;
        soundManager.stop(currentSoundId);
      }
    }

    this.onStop = function (callback) {
      soundSrv.onStop(function () {
        isPlaying = false;
        callback();
      });
    };

    this.onFinish =  function (callback) {
      soundSrv.onFinish(function () {
        currentSoundId = null;
        callback();
      });
    };

    this.onHalfPlay = function (callback) {
      soundSrv.onHalfPlay(callback);
    };

    this.isPlaying = function () {
      return isPlaying;
    };

    this.destroySound = function (url) {
      var soundId = getSoundId(url);
      if (soundId) {
        if (soundId === currentSoundId) {
          soundManager.stop(currentSoundId);
          currentSoundId = null;
        }
        delete soundUrlsToIds[url];
        soundManager.destroySound(soundId);
      }
    };

    this.play = function (url) {
      var soundId = getSoundId(url) || createSound(url);
      stop();
      isPlaying = true;
      currentSoundId = soundId;
      soundManager.play(soundId, soundSrv.getEventsHandler());
    };

    this.setPosition = function (position) {
      if (currentSoundId) {
        soundManager.setPosition(currentSoundId, position * 1000);
      }
    };

    this.pause = function () {
      if (currentSoundId) {
        isPlaying = false;
        soundManager.pause(currentSoundId);
      }
    };

    this.resume = function () {
      if (currentSoundId) {
        isPlaying = true;
        soundManager.resume(currentSoundId);
        return true;
      }
      return false;
    };
  }

  SoundManagerSrv.$inject = [ '$window', 'config', 'soundSrv' ];

  return SoundManagerSrv;
});
