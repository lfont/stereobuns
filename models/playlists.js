/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function (Song) {
    var exports = {};

    exports.create = function (userId, playlistName, callback) {
        Song.update(
            { userId: userId, url: 'empty:' },
            {
                userId: userId,
                url: 'empty:',
                $addToSet: { playlists: playlistName }
            },
            { upsert: true },
            function (err, numberAffected, raw) {
                if (err) {
                    // TODO: handle error
                    console.log(err);
                }
                callback(err, numberAffected);
            });
    };
    
    exports.delete = function (userId, playlistName, callback) {
        Song.update(
            { userId: userId },
            { $pull: { playlists: playlistName } },
            { multi: true },
            function (err, numberAffected, raw) {
                if (err) {
                    // TODO: handle error
                    console.log(err);
                }
                callback(err, numberAffected);
            });
    };
    
    exports.findByName = function (userId, playlistName, callback) {
        Song.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            { $unwind: '$playlists' },
            { $match: { 'playlists': playlistName, 'url': { $ne: 'empty:' } } },
            { $group: { _id: playlistName, songs: { $push: {
                _id: '$_id',
                artist: '$artist',
                album: '$album',
                track: '$track',
                source: '$source',
                url: '$url',
                artworkUrl: '$artworkUrl',
                loved: '$loved',
            } } } },
            { $project: { _id: 0, name: '$_id', songs: 1 } }
        ], function (err, results) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            if (results.length === 0) {
                callback(err, { name: playlistName, songs: [] });
            } else {
                callback(err, results[0]);
            }
        });
    };
    
    exports.countSongs = function (userId, callback) {
        Song.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            { $unwind: '$playlists' },
            { $group: { _id: '$playlists', length: { $sum: 1 } } },
            { $project: { _id: 0, name: '$_id', length: { $add: [ '$length', -1 ] } } },
            { $sort: { name: 1 } }
        ], function (err, playlists) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err, playlists);
        });
    };
    
    return exports;
};
