/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose'),
    songs     = require('./songs'),
    playlists = require('./playlists')(songs.Song);

var userSchema = new mongoose.Schema({
        email: { type: String, required: true },
        name: String,
        picture: String
    });

var User = mongoose.model('User', userSchema);

exports.create = function (userData, callback) {
    User.create(userData, function (err, user) {
        if (err) {
            // TODO: handle error
            console.log(err);
            callback(err);
            return;
        }
        playlists.create(user.id, 'My Collection', function (err) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err, user);
        });
    });
};

exports.findById = function (id, callback) {
    User.findById(id, function (err, user) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, user);
    });
};

exports.findByEmail = function (email, callback) {
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, user);
    });
};
