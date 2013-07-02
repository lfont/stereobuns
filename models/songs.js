/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose');

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
    Song.update(
        { userId: userId, url: songData.url },
        {
            userId: userId,
            artist: songData.artist,
            album: songData.album,
            track: songData.track,
            source: songData.source,
            url: songData.url,
            artworkUrl: songData.artworkUrl,
            loved: true
        },
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
