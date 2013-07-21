/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'observable',
  'soundmanager2'
], function (angular, Observable, soundManager) {
  'use strict';

  function SoundManagerSrv ($window, config, soundSrv) {
    var _this          = this,
        isPlaying      = false,
        soundUrlsToIds = {},
        currentSoundId;

    angular.extend(this, new Observable());

    soundManager.setup({
      url: '/components/soundmanager/swf/',
      debugMode: config.debug,
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

    soundSrv.on('stop', function () {
      isPlaying = false;
      _this.trigger('stop');
    });

    soundSrv.on('finish', function () {
      currentSoundId = null;
      _this.trigger('finish');
    });

    [ 'play', 'pause', 'resume',
      'halfPlay', 'loading', 'playing' ].forEach(function (topic) {
      soundSrv.on(topic, _this.trigger.bind(_this, topic));
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
