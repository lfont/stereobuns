/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose'),
    users     = require('./users'),
    songs     = require('./songs'),
    playlists = require('./playlists')(songs.Song),
    config    = require('../lib/configuration');

mongoose.connect(config.mongodbConnectionString);

module.exports = {
    users: users,
    playlists: playlists,
    songs: songs
};
