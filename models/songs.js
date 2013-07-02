/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function (Playlist) {
    var songs = {};
    
    songs.addToPlaylist = function (userId, playlistName, songData, callback) {
        callback();
    };
    
    songs.removeFromPlaylist = function (userId, playlistName, id, callback) {
        callback();
    };
    
    return songs;
};
