/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'soundmanager2'
], function (soundManager) {
    'use strict';
        
    function AudioPlayerSrvFactory ($rootScope, $window) {
        var isReady = false,
            currentSoundId = null,
            soundUrlsToIds = {},
            queue = [],
            queueIndex = 0,
            isPlaying = false;
        
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
        
        SoundEventsHandler.prototype.onplay = function () {
            SoundEventsHandler.previousSoundPosition = 0;
        };
        
        SoundEventsHandler.prototype.onfinish = function () {
            if (!audioPlayerService.next()) {
                currentSoundId = null;
                isPlaying = false;
                $rootScope.$broadcast('audioPlayer:stop');
                $rootScope.$apply();
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
        
        function destroySounds () {
            var url;
            
            for (url in soundUrlsToIds) {
                if (soundUrlsToIds.hasOwnProperty(url)) {
                    soundManager.destroySound(soundUrlsToIds[url]);
                }
            }
            soundUrlsToIds = {};
        }
            
        var audioPlayerService = {
            getCurrentSong: function () {
                return queue[queueIndex];
            },
            
            isPlaying: function () {
                return isPlaying;
            },
            
            enqueue: function (songs) {
                queue = queue.concat(songs);
                $rootScope.$broadcast('audioPlayer:enqueue', songs);
            },
            
            clearQueue: function () {
                if (currentSoundId) {
                    soundManager.stop(currentSoundId);
                }
                destroySounds();
                currentSoundId = null;
                queue.length = 0;
                $rootScope.$broadcast('audioPlayer:clearQueue');
            },
                
            play: function (song) {
                var soundId;
                
                if (!isReady) {
                    return;
                }
                
                if (!song) {
                    if (!currentSoundId) {
                        return;
                    }
                    isPlaying = true;
                    soundManager.resume(currentSoundId);
                    $rootScope.$broadcast('audioPlayer:resume');
                } else {
                    if (currentSoundId) {
                        soundManager.stop(currentSoundId);
                    }
                    soundId = getSoundId(song);
                    if (!soundId) {
                        queueIndex = queue.length;
                        this.enqueue([ song ]);
                        soundId = createSound(song);
                    } else {
                        queueIndex = queue.indexOf(song);
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
            }
        };
        
        return audioPlayerService;
    }
    
    AudioPlayerSrvFactory.$inject = [ '$rootScope', '$window' ];
    
    return AudioPlayerSrvFactory;
});
