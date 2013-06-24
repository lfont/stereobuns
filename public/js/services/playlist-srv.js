/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function playlistSrvFactory () {
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
                            break;
                        }
                    }
                }
            };
        }
        
        function initializeStores (storeNames) {
            var i, len, storeName;
            for (i = 0, len = storeNames.length; i < len; i++) {
                storeName = storeNames[i];
                playlistStores[storeName] = new PlaylistStore(storeName);
            }
        }
        
        initializeStores([ 'Loved', 'My Collection' ]);
        
        return {
            getStores: function () {
                var stores = [],
                    property;
                for (property in playlistStores) {
                    if (playlistStores.hasOwnProperty(property)) {
                        stores.push(playlistStores[property]);
                    }
                }
                return stores;
            },
            
            getStore: function (name) {
                return playlistStores[name];
            }
        };
    }
    
    playlistSrvFactory.$inject = [];
    
    return playlistSrvFactory;
});
