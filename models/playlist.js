/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var playlistSchema = new Schema({
    name: String,
    userId: Schema.ObjectId,
    length: {
        type: Number,
        default: 0
    },
    songs: [ {
        artist: String,
        album: String,
        track: String,
        source: String,
        url: String,
        artworkUrl: String
    } ]
});

var Playlist = mongoose.model('Playlist', playlistSchema);

exports.create = function (playlists, callback) {
    Playlist.create(playlists, function (err, newPlaylists) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, newPlaylists);
    });
};

exports.getPlaylists = function (userId, callback) {
    Playlist.find({ userId: userId })
            .sort('name')
            .select('name length')
            .exec(function (err, playlists) {
                if (err) {
                    // TODO: handle error
                    console.log(err);
                }
                callback(err, playlists);
            });
};

exports.getPlaylist = function (userId, name, callback) {
    Playlist.find({ userId: userId, name: name }, function (err, playlist) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, playlist);
    });
};
