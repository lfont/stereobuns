/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular',
  'observable'
], function (angular, Observable) {
  'use strict';

  function SoundSrvFactory () {
    var _this             = this,
        playingPosition   = 0,
        loadingPercentage = 0,
        playTime          = 0,
        halfPlayTriggered = false;

    angular.extend(this, new Observable());

    function updatePlayTime (sound, duration) {
      if (halfPlayTriggered) {
        return;
      }

      if (++playTime >= (duration / 2)) {
        _this.trigger('halfPlay', playTime);
        halfPlayTriggered = true;
      }
    }

    var onplay = function () {
      playingPosition = 0;
      loadingPercentage = 0;
      playTime = 0;
      halfPlayTriggered = false;
      _this.trigger('play', this.readyState === 3);
    };

    var onpause = function () {
      _this.trigger('pause');
    };

    var onresume = function () {
      _this.trigger('resume');
    };

    var onstop = function () {
      _this.trigger('stop');
    };

    var onfinish = function () {
      _this.trigger('finish');
    };

    var whileloading = function () {
      var bytesLoaded  = this.bytesLoaded > 0.99999995 ? 1 : this.bytesLoaded,
          percentage   = Math.floor(bytesLoaded * 100 / this.bytesTotal),
          shouldUpdate = percentage !== loadingPercentage;

      if (!shouldUpdate) {
        return;
      }

      loadingPercentage = percentage;
      _this.trigger('loading', percentage);
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

      _this.trigger('playing', {
        position: position,
        duration: duration,
        percentage: Math.floor(position * 100 / duration)
      });

      updatePlayTime(this, duration);
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

  return SoundSrvFactory;
});
