/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function SoundSrvFactory ($rootScope) {
    var playingPosition = 0,
        loadingPercentage = 0,
        playTime = 0,
        halfPlayTriggered = false,
        onStopCallback,
        onFinishCallback,
        onHalfPlayCallback;

    function apply () {
      if(!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    }

    function updatePlayTime (sound, duration) {
      if (halfPlayTriggered) {
        return;
      }

      if (++playTime >= (duration / 2)) {
        onHalfPlayCallback();
        halfPlayTriggered = true;
      }
    }

    var onplay = function () {
      playingPosition = 0;
      loadingPercentage = 0;
      playTime = 0;
      halfPlayTriggered = false;
      $rootScope.$broadcast('audioPlayer:play', this.readyState === 3);
      apply();
    };

    var onpause = function () {
      $rootScope.$broadcast('audioPlayer:pause');
      apply();
    };

    var onresume = function () {
      $rootScope.$broadcast('audioPlayer:resume');
      apply();
    };

    var onstop = function () {
      onStopCallback();
    };

    var onfinish = function () {
      onFinishCallback();
    };

    var whileloading = function () {
      var bytesLoaded  = this.bytesLoaded > 0.99999995 ? 1 : this.bytesLoaded,
          percentage   = Math.floor(bytesLoaded * 100 / this.bytesTotal),
          shouldUpdate = percentage !== loadingPercentage;

      if (!shouldUpdate) {
        return;
      }

      loadingPercentage = percentage;
      $rootScope.$broadcast('audioPlayer:loading', percentage);
      apply();
    };

    var whileplaying = function () {
      var position     = Math.floor(this.position / 1000),
          shouldUpdate = position !== playingPosition,
          duration;

      if (!shouldUpdate) {
        return;
      }

      playingPosition = position;
      duration = Math.floor((this.readyState === 3 ?
                            this.duration : this.durationEstimate) / 1000);

      $rootScope.$broadcast('audioPlayer:playing', {
        position: position,
        duration: duration,
        percentage: Math.floor(position * 100 / duration)
      });

      apply();
      updatePlayTime(this, duration);
    };

    this.onStop = function (callback) {
      onStopCallback = callback;
    };

    this.onFinish = function (callback) {
      onFinishCallback = callback;
    };

    this.onHalfPlay = function (callback) {
      onHalfPlayCallback = callback;
    };

    this.getEventsHandler = function () {
      return {
        onplay: onplay,
        onpause: onpause,
        onresume: onresume,
        onstop: onstop,
        onfinish: onfinish,
        whileloading: whileloading,
        whileplaying: whileplaying
      };
    };
  }

  SoundSrvFactory.$inject = [ '$rootScope' ];

  return SoundSrvFactory;
});
