/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _           = require('underscore'),
    Song        = require('./models').Song,
    orphanSongs = require('./orphan-songs');

exports.findByUserId = function (userId, callback) {
  Song.find({ userId: userId, queueIndex: { $exists: true } },
            null,
            { sort: { queueIndex: 1, queueTimestamp: 1 } },
            function (err, songs) {
              if (err) {
                // TODO: handle error
                console.log(err);
              }
              callback(err, { id: 'queued', songs: songs });
            });
};

exports.add = function (userId, songData, index, callback) {
  _.extend(songData, { queueIndex: index, queueTimestamp: Date.now() });
  Song.update(
    { userId: userId, url: songData.url },
    songData,
    { upsert: true },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};

exports.remove = function (userId, url, callback) {
  Song.update(
    { userId: userId, url: url },
    { $unset: { queueIndex: '', queueTimestamp: '' } },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      orphanSongs.cleanForUserId(userId);
      callback(err, numberAffected);
    });
};
