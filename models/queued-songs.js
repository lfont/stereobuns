/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _           = require('underscore'),
    Song        = require('./model').Song,
    orphanSongs = require('./orphan-songs');

exports.findByUserId = function (userId, callback) {
  Song.find(
    { _creator: userId, queueIndex: { $exists: true } },
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

exports.add = function (userId, songData, callback) {
  function update (index) {
    _.extend(songData, { queueIndex: index, queueTimestamp: Date.now() });
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
  }

  Song.find(
    { _creator: userId, queueIndex: { $exists: true } },
    '+queueIndex',
    { sort: { queueIndex: -1 }, limit: 1 },
    function (err, songs) {
      if (err) {
        // TODO: handle error
        console.log(err);
        callback(err);
        return;
      }
      update(songs.length ? songs[0].queueIndex + 1 : 0);
    });
};

exports.remove = function (userId, url, callback) {
  Song.update(
    { _creator: userId, url: url },
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
