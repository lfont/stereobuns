/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function songsMdlFactory ($rootScope, $q, $http, $window) {
        var songsStoresMap = {},
            songsStores    = [];
        
        function LovedSongsStore () {
            var _this = this;
            
            this.name = 'Loved';
            this.length = 0;
            this.icon = 'icon-heart';
            
            this.songs = function () {
                var deferred = $q.defer();
                $http
                    .get('/api/users/me/songs/loved')
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
                $http
                    .post('/api/users/me/songs/loved', song)
                    .success(function (data, status, headers, config) {
                        if (data.count !== 0) {
                            _this.length++;
                            $rootScope.$broadcast('songsStore:add', _this.name, song);
                            $window.console.log('song: ' + song.url + ' has been loved.');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: handle error
                        $window.console.log('song: ' + song.url + ' has not been loved.');
                    });
            };
            
            this.remove = function (song) {
                $http
                    .put('/api/users/me/songs/loved', song)
                    .success(function (data, status, headers, config) {
                        if (data.count !== 0) {
                            _this.length--;
                            $rootScope.$broadcast('songsStore:remove', _this.name, song);
                            $window.console.log('song: ' + song.url + ' has been unloved.');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: handle error
                        $window.console.log('song: ' + song.url + ' has not been unloved.');
                    });
            };
        }
        
        return {
            getSongsStores: function () {
                if (!songsStoresMap.loved) {
                    songsStoresMap.loved = new LovedSongsStore();
                    songsStores.push(songsStoresMap.loved);
                }
                return songsStores;
            },
            
            getSongsStore: function (name) {
                this.getSongsStores(); // ensure that all stores are loaded
                return songsStoresMap[name];
            }
        };
    }
    
    songsMdlFactory.$inject = [ '$rootScope', '$q', '$http', '$window' ];
    
    return songsMdlFactory;
});
