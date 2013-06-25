/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'soundmanager2'
], function (angular, soundManager) {
    'use strict';
        
    function AudioPlayerSrvFactory ($rootScope, $window) {
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
            ontimeout: function() {
                $window.alert('SM2 init failed!');
            },
            defaultOptions: {
                // set global default volume for all sound objects
                volume: 100
            }
        });
        
        function SoundEventsHandler () {}
        SoundEventsHandler.previousSoundPosition = 0;
        
        SoundEventsHandler.stop = function () {
            isPlaying = false;
            $rootScope.$broadcast('audioPlayer:stop');
            $rootScope.$broadcast('audioPlayer:playing', null);
        };
        
        SoundEventsHandler.prototype.onplay = function () {
            SoundEventsHandler.previousSoundPosition = 0;
        };
        
        SoundEventsHandler.prototype.onstop = function () {
            SoundEventsHandler.stop();
        };
        
        SoundEventsHandler.prototype.onfinish = function () {
            if (!audioPlayerService.next()) {
                currentSoundId = null;
                if (repeat) {
                    queueIndex = 0;
                    audioPlayerService.play();
                } else {
                    SoundEventsHandler.stop();
                }
            }
        };
        
        SoundEventsHandler.prototype.whileplaying = function () {
            var position = this.position / 1000,
                shouldUpdate = position - SoundEventsHandler.previousSoundPosition >= 1,
                duration, progress;
            
            if (!shouldUpdate) {
                return;
            }
            
            SoundEventsHandler.previousSoundPosition = position;
            duration = this.duration / 1000;
            
            progress = {
                duration: parseInt(duration, 10),
                position: parseInt(position, 10)
            };
            progress.percentage = progress.position * 100 / progress.duration;
            
            $rootScope.$broadcast('audioPlayer:playing', progress);
            $rootScope.$apply();
        };
        
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
            
        var audioPlayerService = {
            getCurrentSong: function () {
                return queue[queueIndex];
            },
            
            isPlaying: function () {
                return isPlaying;
            },
            
            getQueue: function () {
                return queue;
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
                        $rootScope.$broadcast('audioPlayer:resume');
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
                    soundManager.play(soundId, new SoundEventsHandler());
                    $rootScope.$broadcast('audioPlayer:play', song);
                }
            },
                
            pause: function () {
                if (!isReady || !currentSoundId) {
                    return;
                }
                
                isPlaying = false;
                soundManager.pause(currentSoundId);
                $rootScope.$broadcast('audioPlayer:pause');
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
        
        return audioPlayerService;
    }
    
    AudioPlayerSrvFactory.$inject = [ '$rootScope', '$window' ];
    
    return AudioPlayerSrvFactory;
});
