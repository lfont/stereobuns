/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _           = require('underscore'),
    Types       = require('mongoose').Types,
    Song        = require('./models').Song,
    orphanSongs = require('./orphan-songs');

exports.create = function (userId, playlistName, callback) {
  Song.update(
    { _creator: userId, url: 'empty:' },
    {
      _creator: userId,
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
    { _creator: userId },
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
  var creator = userId instanceof Object ? userId : Types.ObjectId(userId);
  Song.aggregate([
    { $match: { _creator: creator } },
    { $unwind: '$playlists' },
    { $match: { 'playlists': playlistName, 'url': { $ne: 'empty:' } } },
    { $group: { _id: playlistName, songs: { $push: {
      _id: '$_id',
      trackId: '$trackId',
      artist: '$artist',
      album: '$album',
      name: '$name',
      source: '$source',
      url: '$url',
      linkUrl: '$linkUrl',
      artworkUrl: '$artworkUrl',
      loved: '$loved'
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

exports.countSongsByPlaylists = function (userId, callback) {
  var creator = userId instanceof Object ? userId : Types.ObjectId(userId);
  Song.aggregate([
    { $match: { _creator: creator } },
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

exports.addSong = function (userId, playlistName, songData, callback) {
  Song.count(
    { _creator: userId, url: songData.url, playlists: playlistName },
    function (err, count) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      if (!count) {
        _.extend(songData, { $addToSet: { playlists: playlistName } });
        Song.update(
          { _creator: userId, url: songData.url },
          songData,
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

exports.removeSong = function (userId, playlistName, songId, callback) {
  Song.update(
    { _creator: userId, _id: songId },
    { $pull: { playlists: playlistName } },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      orphanSongs.cleanForUserId(userId);
      callback(err, numberAffected);
    });
};
