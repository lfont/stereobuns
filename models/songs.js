/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose = require('mongoose'),
    _        = require('underscore');

var Schema = mongoose.Schema;

var songSchema = new Schema({
    userId: { type: Schema.ObjectId, required: true },
    artist: String,
    album: String,
    track: String,
    source: String,
    url: { type: String, required: true },
    artworkUrl: String,
    loved: Boolean,
    playlists: [{
        name: { type: String, required: true }
    }]
});

var Song = exports.Song = mongoose.model('Song', songSchema);

function sanitize (songData) {
    delete songData._id;
    delete songData.playlists;
    return songData;
}

exports.loved = function (userId, callback) {
    Song.find({ userId: userId, loved: true }, function (err, songs) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, songs);
    });
};
    
exports.love = function (userId, songData, callback) {
    var song = _.extend(sanitize(songData), { loved: true });
    Song.update(
        { userId: userId, url: song.url },
        song,
        { upsert: true },
        function (err) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err);
        });
};

exports.unlove = function (userId, url, callback) {
    Song.update(
        { userId: userId, url: url },
        { loved: false },
        function (err) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err);
        });
};
                
exports.addToPlaylist = function (userId, playlistName, songData, callback) {
    var song = _.extend(sanitize(songData), { $addToSet: { playlists: { name: playlistName } } });
    Song.update(
        { userId: userId, url: song.url },
        song,
        { upsert: true },
        function (err) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err);
        });
};
            
exports.removeFromPlaylist = function (userId, playlistName, songId, callback) {
    Song.update(
        { userId: userId, _id: songId },
        { $pull: { playlists: { name: playlistName } } },
        function (err) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err);
        });
};
