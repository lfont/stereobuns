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
                        _this.length = data.length;
                        deferred.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            };
            
            this.add = function (song) {
                this.length++;
                $rootScope.$broadcast('songsStore:add', this.name, song);
                $http
                    .post('/api/users/me/songs/loved', song)
                    .success(function (data, status, headers, config) {
                        $window.console.log('song: ' + song.url + ' has been loved.');
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: handle error
                        _this.length--;
                        $rootScope.$broadcast('songsStore:remove', _this.name, song);
                    });
            };
            
            this.remove = function (song) {
                this.length--;
                $rootScope.$broadcast('songsStore:remove', this.name, song);
                $http
                    .put('/api/users/me/songs/loved', song)
                    .success(function (data, status, headers, config) {
                        $window.console.log('song: ' + song.url + ' has been unloved.');
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: handle error
                        _this.length++;
                        $rootScope.$broadcast('songsStore:add', _this.name, song);
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
