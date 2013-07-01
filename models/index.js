/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/soundrocket');

module.exports = {
    user: require('./user'),
    playlist: require('./playlist')
};
