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

    function indexOfSong (url) {
      var index = -1;
      if (url) {
        index = $rootScope.utils.indexOf(queuedSongs, 'url', url);
      }
      return index;
    }

    function indexOfCurrentSong () {
      var url = soundManagerSrv.getCurrentUrl();
      return indexOfSong(url);
    }

    function play (song) {
      var exists = $rootScope.utils.indexOf(queuedSongs, 'url', song.url) > -1;
      if (!exists) {
        _this.enqueue(song).then(function () {
          soundManagerSrv.play(song.url);
        });
      } else {
        soundManagerSrv.play(song.url);
      }
    }

    function destroySound (song) {
      var songIndex = $rootScope.utils.indexOf(queuedSongs, 'url', song.url);
      queuedSongs.splice(songIndex, 1);
      soundManagerSrv.destroySound(song.url);
    }

    soundManagerSrv.on('playing', function (progress) {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('audioPlayer:playing', progress);
      });
    });

    soundManagerSrv.on('loading', function (percentage) {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('audioPlayer:loading', percentage);
      });
    });

    soundManagerSrv.on('play', function (loaded) {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('audioPlayer:play', loaded);
      });
    });

    soundManagerSrv.on('pause', function () {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('audioPlayer:pause');
      });
    });

    soundManagerSrv.on('resume', function () {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('audioPlayer:resume');
      });
    });

    soundManagerSrv.on('stop', function () {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('audioPlayer:stop');
      });
    });

    soundManagerSrv.on('halfPlay', function (playTime) {
      var song = _this.getStatus().song,
          mostPlayedSongsGroup = songsGroupsMdl.get('mostplayed');
      mostPlayedSongsGroup.add(song);
    });

    soundManagerSrv.on('finish', function (latestUrl) {
      if (!_this.next(latestUrl)) {
        if (repeat) {
          _this.play();
        } else {
          $rootScope.$apply(function () {
            $rootScope.$broadcast('audioPlayer:stop');
          });
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

    this.stop = function () {
      soundManagerSrv.stop();
    };

    this.previous = function () {
      var songIndex = indexOfCurrentSong();
      if (--songIndex > -1) {
        play(queuedSongs[songIndex]);
        return true;
      }
      return false;
    };

    this.next = function (previousUrl) {
      var songIndex = previousUrl ?
        indexOfSong(previousUrl) :
        indexOfCurrentSong();

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

  AudioPlayerSrv.$inject = [ '$rootScope', 'soundManagerSrv',
                             'songsGroupsMdl' ];

  return AudioPlayerSrv;
});
