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
            currentPlaylist = null,
            currentSoundId = null,
            soundUrlsToIds = {},
            previousSoundPosition = 0;
        
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
        }
        
        function SoundEventsHandler () {
        }
        
        SoundEventsHandler.prototype.onfinish = function () {
            // TODO: play next item of the playlist
            currentSoundId = null;
            $rootScope.$broadcast('audioPlayer:stop');
            $rootScope.$apply();
        };
        
        SoundEventsHandler.prototype.whileplaying = function () {
            var position = parseInt(this.position / 1000, 10),
                shouldUpdate = position - previousSoundPosition >= 1,
                duration, progress;
            
            previousSoundPosition = position;
            
            if (!shouldUpdate) {
                return;
            }
            
            duration = this.duration / 1000;
            progress = {
                duration: duration,
                position: position,
                percentage: position * 100 / duration
            };
            
            $rootScope.$broadcast('audioPlayer:playing', progress);
            $rootScope.$apply();
        };
            
        return {
            setPlaylist: function (playlist) {
                this.pause();
                destroySounds();
                currentSoundId = null;
                currentPlaylist = playlist;
                $rootScope.$broadcast('audioPlayer:playlist', currentPlaylist);
            },
                
            getPlaylist: function () {
                return currentPlaylist;
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
                    soundManager.resume(currentSoundId);
                    $rootScope.$broadcast('audioPlayer:resume');
                } else {
                    if (currentSoundId) {
                        soundManager.stop(currentSoundId);
                    }
                    soundId = getSoundId(song);
                    if (!soundId) {
                        soundId = createSound(song);
                    }
                    currentSoundId = soundId;
                    soundManager.play(soundId, new SoundEventsHandler());
                    $rootScope.$broadcast('audioPlayer:play', song);
                }
            },
                
            pause: function () {
                if (!isReady || !currentSoundId) {
                    return;
                }
                
                soundManager.pause(currentSoundId);
                $rootScope.$broadcast('audioPlayer:pause');
            }
        };
    }
    
    AudioPlayerSrvFactory.$inject = [ '$rootScope', '$window' ];
    
    return AudioPlayerSrvFactory;
});
