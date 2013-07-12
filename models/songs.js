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
    linkUrl: String,
    artworkUrl: String,
    loved: Boolean,
    playlists: Array
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
        callback(err, { name: 'Loved', songs: songs });
    });
};

exports.love = function (userId, songData, callback) {
    var song = _.extend(sanitize(songData), { loved: true });
    Song.update(
        { userId: userId, url: song.url },
        song,
        { upsert: true },
        function (err, numberAffected, raw) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err, numberAffected);
        });
};

exports.unlove = function (userId, url, callback) {
    Song.update(
        { userId: userId, url: url },
        { loved: false },
        function (err, numberAffected, raw) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err, numberAffected);
        });
};

exports.addToPlaylist = function (userId, playlistName, songData, callback) {
    Song.count(
        { userId: userId, url: songData.url, playlists: playlistName },
        function (err, count) {
            var song;
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            if (!count) {
                song = _.extend(sanitize(songData), { $addToSet: { playlists: playlistName } });
                Song.update(
                    { userId: userId, url: song.url },
                    song,
                    { upsert: true },
                    function (err, numberAffected, raw) {
                        if (err) {
                            // TODO: handle error
                            console.log(err);
                        }
                        callback(err, numberAffected);
                    });
            } else {
                callback(err, 0);
            }
        });
};

exports.removeFromPlaylist = function (userId, playlistName, songId, callback) {
    Song.update(
        { userId: userId, _id: songId },
        { $pull: { playlists: playlistName } },
        function (err, numberAffected, raw) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err, numberAffected);
        });
};
