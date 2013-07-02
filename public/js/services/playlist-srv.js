/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function playlistSrvFactory ($rootScope, $q, $http, $timeout) {
        var playlistsMap = {},
            playlists    = [];
        
        function Playlist (playlist) {
            var songs = [];
            
            this.name = playlist.name;
            this.length = playlist.length;
            
            this.getAll = function () {
                return songs;
            };
            
            this.contains = function (song) {
                var i, len, s;
                for (i = 0, len = songs.length; i < len; i++) {
                    s = songs[i];
                    if (s.url === song.url) {
                        return true;
                    }
                }
                return false;
            };
            
            this.add = function (song) {
                var i, len, s, newSongs;
                if (!angular.isArray(song)) {
                    newSongs = [ song ];
                } else {
                    newSongs = song;
                }
                for (i = 0, len = newSongs.length; i < len; i++) {
                    s = newSongs[i];
                    if (!this.contains(s)) {
                        songs.push(s);
                        this.length++;
                        $rootScope.$broadcast('playlistStore:add', this.name, s);
                    }
                }
            };
            
            this.remove = function (song) {
                var i, len, j, jlen, s, oldSongs = [];
                if (!angular.isArray(song)) {
                    oldSongs.push(song);
                } else {
                    // we make a copy of the array because
                    // the given array could be a reference of
                    // the songs array.
                    oldSongs = oldSongs.concat(song);
                }
                for (i = 0, len = oldSongs.length; i < len; i++) {
                    s = oldSongs[i];
                    for (j = 0, jlen = songs.length; j < jlen; j++) {
                        if (songs[j].url === s.url) {
                            songs.splice(j, 1);
                            this.length--;
                            $rootScope.$broadcast('playlistStore:remove', this.name, s);
                            break;
                        }
                    }
                }
            };
        }
        
        return {
            getPlaylists: function () {
                var deferred = $q.defer();
                
                if (playlists.length) {
                    $timeout(function () {
                        deferred.resolve(playlists);
                    }, 0);
                } else {
                    $http
                        .get('/api/users/me/playlists')
                        .success(function (data, status, headers, config) {
                            var i, len;
                            
                            if (playlists.length) {
                                // The data has been loaded by anather call.
                                deferred.resolve(playlists);
                                return;
                            }
                            
                            for (i = 0, len = data.length; i < len; i++) {
                                playlistsMap[data[i].name] = new Playlist(data[i]);
                                playlists.push(playlistsMap[data[i].name]);
                            }
                            deferred.resolve(playlists);
                        })
                        .error(function (data, status, headers, config) {
                            deferred.reject(status);
                        });
                }
                
                return deferred.promise;
            },
            
            getPlaylist: function (name) {
                // FIX: should be async
                return playlists[name];
            }
        };
    }
    
    playlistSrvFactory.$inject = [ '$rootScope', '$q', '$http', '$timeout' ];
    
    return playlistSrvFactory;
});
