/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function AudioPlayerSrv ($rootScope, soundManagerSrv, songsGroupsMdl) {
    var _this            = this,
        queuedSongsGroup = songsGroupsMdl.get('queued'),
        repeat           = false,
        queuedSongs;

    function apply () {
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    }

    function indexOfSong (url) {
      var index = -1,
          i, len;
      for (i = 0, len = queuedSongs.length; i < len; i++) {
        if (queuedSongs[i].url === url) {
          index = i;
          break;
        }
      }
      return index;
    }

    function indexOfCurrentSong () {
      var url   = soundManagerSrv.getCurrentUrl(),
          index = -1;
      if (url) {
        index = indexOfSong(url);
      }
      return index;
    }

    function play (song) {
      var exists = indexOfSong(song.url) > -1;
      if (!exists) {
        _this.enqueue(song).then(function () {
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
      var songIndex = indexOfSong(song.url);
      queuedSongs.splice(songIndex, 1);
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
      var song                 = _this.getStatus().song,
          mostPlayedSongsGroup = songsGroupsMdl.get('mostplayed');
      mostPlayedSongsGroup.add(song);
    });

    soundManagerSrv.on('finish', function () {
      if (!_this.next()) {
        if (repeat) {
          _this.play();
        } else {
          stop();
        }
      }
    });

    this.getStatus = function () {
      var songIndex = indexOfCurrentSong(),
          song      = null;

      if (songIndex > -1) {
        song = queuedSongs[songIndex];
      }

      return {
        song: song,
        isPlaying: soundManagerSrv.isPlaying()
      };
    };

    this.getQueue = function () {
      return queuedSongsGroup
        .songs()
        .then(function (songs) {
          queuedSongs = songs;
          // This must be a copy to prevent alteration
          // of the queue by other component.
          return songs.slice(0);
        });
    };

    this.enqueue = function (songs) {
      var promise;

      function innerEnqueue () {
        return queuedSongsGroup
          .add(songs)
          .then(function (songs) {
            var i, len;

            for (i = 0, len = songs.length; i < len; i++) {
              queuedSongs.push(songs[i]);
            }

            $rootScope.$broadcast('audioPlayer:queue', songs);
            return songs;
          });
      }

      if (!queuedSongs) {
        promise = this.getQueue().then(function () {
          return innerEnqueue();
        });
      } else {
        promise = innerEnqueue();
      }

      return promise;
    };

    this.dequeue = function (songs) {
      return queuedSongsGroup
        .remove(songs)
        .then(function (songs) {
          var i, len;

          for (i = 0, len = songs.length; i < len; i++) {
            destroySound(songs[i]);
          }

          $rootScope.$broadcast('audioPlayer:dequeue', songs);
          return songs;
        });
    };

    this.setPosition = function (position) {
      soundManagerSrv.setPosition(position);
    };

    this.play = function (song) {
      if (!queuedSongs) {
        this.getQueue().then(function () {
          if (song) {
            play(song);
            return;
          }

          if (queuedSongs.length) {
            play(queuedSongs[0]);
          }
        });
        return;
      }

      if (song) {
        play(song);
        return;
      }

      if (soundManagerSrv.resume()) {
        return;
      }

      if (queuedSongs.length) {
        play(queuedSongs[0]);
      }
    };

    this.pause = function () {
      soundManagerSrv.pause();
    };

    this.previous = function () {
      var songIndex = indexOfCurrentSong();
      if (--songIndex > -1) {
        play(queuedSongs[songIndex]);
        return true;
      }
      return false;
    };

    this.next = function () {
      var songIndex = indexOfCurrentSong();
      if (++songIndex < queuedSongs.length) {
        play(queuedSongs[songIndex]);
        return true;
      }
      return false;
    };

    this.toggleRepeat = function (shouldRepeat) {
      repeat = shouldRepeat;
    };
  }

  AudioPlayerSrv.$inject = [ '$rootScope', 'soundManagerSrv', 'songsGroupsMdl' ];

  return AudioPlayerSrv;
});
