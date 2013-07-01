/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function playlistSrvFactory ($rootScope, $q, $http) {
        var playlistStores = {};
        
        function PlaylistStore (name) {
            var songs = [];
            
            this.name = name;
            
            this.getAll = function () {
                return songs;
            };
            
            this.length = function () {
                return songs.length;
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
                            $rootScope.$broadcast('playlistStore:remove', this.name, s);
                            break;
                        }
                    }
                }
            };
        }
        
        return {
            getStores: function () {
                var deferred = $q.defer();
                $http
                    .get('/api/me/playlist')
                    .success(function (data, status, headers, config) {
                        var i, len;
                        for (i = 0, len = data.length; i < len; i++) {
                            if (!playlistStores[data[i].name]) {
                                playlistStores[data[i].name] = new PlaylistStore(data[i].name);
                            }
                        }
                        deferred.resolve(playlistStores);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            },
            
            getStore: function (name) {
                var deferred = $q.defer();
                var promise = this.getStores();
                promise.then(function (playlistStores) {
                    deferred.resolve(playlistStores[name]);
                }, function (error)  {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    }
    
    playlistSrvFactory.$inject = [ '$rootScope', '$q', '$http' ];
    
    return playlistSrvFactory;
});
