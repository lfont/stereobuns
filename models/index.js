/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose = require('mongoose'),
    config   = require('../lib/configuration');

mongoose.connect(config.mongodbConnectionString);

module.exports = {
  users: require('./users'),
  playlists: require('./playlists'),
  trackComments: require('./track-comments'),
  songs: {
    loved: require('./loved-songs'),
    queued: require('./queued-songs'),
    mostPlayed: require('./most-played-songs')
  }
};
