/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose'),
    users     = require('./users'),
    playlists = require('./playlists'),
    songs     = require('./songs')(playlists.Playlist);

mongoose.connect('mongodb://localhost/soundrocket');

module.exports = {
    users: users,
    playlists: playlists,
    songs: songs
};
