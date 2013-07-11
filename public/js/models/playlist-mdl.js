/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function playlistMdlFactory ($rootScope, $q, $http, $window) {
        var playlistStoresMap = {},
            playlistStores    = [];
        
        function PlaylistStore (playlist) {
            var _this = this;
            
            this.name = playlist.name;
            this.length = playlist.length;
            
            function addOne (song) {
                $http
                    .post('/api/users/me/playlists/' + _this.name + '/songs', song)
                    .success(function (data, status, headers, config) {
                        if (data.count !== 0) {
                            _this.length++;
                            $rootScope.$broadcast('playlistStore:add', _this.name, song);
                            $window.console.log('song: ' + song.url + ' has been added to ' + _this.name);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: handle error
                        $window.console.log('song: ' + song.url + ' has not been added to ' + _this.name);
                    });
            }
            
            function removeOne (song) {
                $http
                    .delete('/api/users/me/playlists/' + _this.name + '/songs/' + song._id)
                    .success(function (data, status, headers, config) {
                        if (data.count !== 0) {
                            _this.length--;
                            $rootScope.$broadcast('playlistStore:remove', _this.name, song);
                            $window.console.log('song: ' + song.url + ' has been removed from ' + _this.name);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: handle error
                        $window.console.log('song: ' + song.url + ' has not been removed from ' + _this.name);
                    });
            }
            
            this.songs = function () {
                var deferred = $q.defer();
                $http
                    .get('/api/users/me/playlists/' + this.name)
                    .success(function (data, status, headers, config) {
                        _this.length = data.songs.length;
                        deferred.resolve(data.songs);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            };
            
            this.add = function (song) {
                var i, len, songs;
                if (!angular.isArray(song)) {
                    songs = [ song ];
                } else {
                    songs = song;
                }
                for (i = 0, len = songs.length; i < len; i++) {
                    addOne(songs[i]);
                }
            };
            
            this.remove = function (song) {
                var i, len, songs;
                if (!angular.isArray(song)) {
                    songs = [ song ];
                } else {
                    // the array must be duplicated because it can be
                    // altered during the iteration.
                    songs = song.slice(0);
                }
                for (i = 0, len = songs.length; i < len; i++) {
                    removeOne(songs[i]);
                }
            };
        }
        
        return {
            getPlaylistStores: function () {
                var deferred = $q.defer();
                
                $http
                    .get('/api/users/me/playlists', { cache: true })
                    .success(function (data, status, headers, config) {
                        var i, len, name;
                        
                        if (playlistStores.length) {
                            // The data has been loaded by anather call.
                            deferred.resolve(playlistStores);
                            return;
                        }
                        
                        for (i = 0, len = data.length; i < len; i++) {
                            name = data[i].name.toLowerCase();
                            playlistStoresMap[name] = new PlaylistStore(data[i]);
                            playlistStores.push(playlistStoresMap[name]);
                        }
                        
                        deferred.resolve(playlistStores);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });
                
                return deferred.promise;
            },
            
            getPlaylistStore: function (name) {
                var deferred = $q.defer(),
                    promise  = this.getPlaylistStores();
                
                promise.then(function (playlistStores) {
                    deferred.resolve(playlistStoresMap[name]);
                }, function (error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            },
            
            createPlaylistStore: function (name) {
                var deferred = $q.defer();
                
                $http
                    .post('/api/users/me/playlists', { name: name })
                    .success(function (data, status, headers, config) {
                        var playlistStore = new PlaylistStore({
                                name: name,
                                length: 0
                            });
                        
                        playlistStoresMap[playlistStore.name.toLowerCase()] = playlistStore;
                        playlistStores.push(playlistStore);
                        
                        deferred.resolve(playlistStore);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });
                
                return deferred.promise;
            },
            
            deletePlaylistStore: function (playlistStore) {
                $http
                    .delete('/api/users/me/playlists/' + playlistStore.name)
                    .success(function (data, status, headers, config) {
                        var index = playlistStores.indexOf(playlistStore);
                        
                        delete playlistStoresMap[name.toLowerCase()];
                        playlistStores.splice(index, 1);
                        
                        $window.console.log('playlist: ' + playlistStore.name + ' has been removed');
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: handle error
                        $window.console.log('playlist: ' + playlistStore.name + ' has not been removed');
                    });
            }
        };
    }
    
    playlistMdlFactory.$inject = [ '$rootScope', '$q', '$http', '$window' ];
    
    return playlistMdlFactory;
});
