/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

var playlistSchema = new Schema({
    userId: { type: Schema.ObjectId, required: true },
    name: { type: String, required: true },
    length: { type: Number, default: 0 },
    songs: [{
        artist: String,
        album: String,
        track: String,
        source: String,
        url: String,
        artworkUrl: String,
        loved: Boolean
    }]
});

var Playlist = exports.Playlist = mongoose.model('Playlist', playlistSchema);

exports.create = function (userId, name, callback) {
    Playlist.create({ userId: userId, name: name }, function (err, playlist) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, playlist);
    });
};

exports.findByName = function (userId, name, callback) {
    if (name === 'Loved') {
        Playlist.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            { $unwind: '$songs' },
            { $match: { 'songs.loved': true } },
            { $group: { _id: 'Loved', songs: { $addToSet: '$songs' } } },
            { $project: { _id: 0, name: '$_id', songs: 1 } }
        ], function (err, playlist) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            
            if (playlist.length) {
                callback(err, playlist[0]);
            } else {
                callback(err, { name: 'Loved', songs: [] });
            }
        });
        return;
    }
    
    Playlist.findOne({ userId: userId, name: name }, function (err, playlist) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, playlist);
    });
};

exports.countByPlaylists = function (userId, callback) {
    Playlist.find(
        { userId: userId },
        { _id: 0, name: 1, length: 1 },
        { sort: { name: 1 } },
        function (err, playlists) {
            if (err) {
                // TODO: handle error
                console.log(err);
                callback(err);
                return;
            }
            
            Playlist.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(userId) } },
                { $unwind: '$songs' },
                { $match: { 'songs.loved': true } },
                { $group: { _id: 'Loved', length: { $sum: 1 } } },
                { $project: { _id: 0, name: '$_id', length: 1 } }
            ], function (err, playlist) {
                if (err) {
                    // TODO: handle error
                    console.log(err);
                }
                
                if (playlist.length) {
                    playlists.push(playlist[0]);
                } else {
                    playlists.push({ name: 'Loved', songs: [] });
                }
                
                callback(err, playlists);
            });
        });
};
