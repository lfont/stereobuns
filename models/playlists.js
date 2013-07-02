/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function (Song) {
    var exports = {};

    exports.create = function (userId, playlistName, callback) {
        // TODO: check if exists?
        Song.create({
            userId: userId,
            url: 'empty:',
            playlists: [{
                name: playlistName
            }]
        }, function (err) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            callback(err);
        });
    };
    
    exports.findByName = function (userId, playlistName, callback) {
        Song.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            { $unwind: '$playlists' },
            { $match: { 'playlists.name': playlistName } },
            { $group: { _id: playlistName, songs: { $push: {
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
                callback(err, null);
            } else if (results[0].songs.length === 1) {
                results[0].songs.length = 0;
                callback(err, results[0]);
            } else {
                callback(err, results[0]);
            }
        });
    };
    
    exports.countSongs = function (userId, callback) {
        Song.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            { $unwind: '$playlists' },
            { $group: { _id: '$playlists.name', length: { $sum: 1 } } },
            { $project: { _id: 0, name: '$_id', length: { $add: [ '$length', -1 ] } } },
            { $sort: { name: 1 } }
        ], function (err, playlists) {
            if (err) {
                // TODO: handle error
                console.log(err);
            }
            // TODO: asyncjs?
            Song.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(userId), loved: true } },
                { $group: { _id: 'Loved', length: { $sum: 1 } } },
                { $project: { _id: 0, name: '$_id', length: 1 } },
            ], function (err, results) {
                if (err) {
                    // TODO: handle error
                    console.log(err);
                }
                if (results.length) {
                    playlists.splice(0, 0, results[0]);
                } else {
                    playlists.splice(0, 0, { name: 'Loved', length: 0 });
                }
                callback(err, playlists);
            });
        });
    };
                
    exports.addSong = function (userId, playlistName, songData, callback) {
        callback({});
    };
                
    exports.removeSong = function (userId, playlistName, songId, callback) {
        callback({});
    };
    
    return exports;
};
