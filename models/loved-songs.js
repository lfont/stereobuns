/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _           = require('underscore'),
    Song        = require('./model').Song,
    orphanSongs = require('./orphan-songs');

exports.findByUserId = function (userId, callback) {
  Song.find({ _creator: userId, loved: true }, function (err, songs) {
    if (err) {
      // TODO: handle error
      console.log(err);
    }
    callback(err, { id: 'loved', songs: songs });
  });
};

exports.add = function (userId, songData, callback) {
  _.extend(songData, { loved: true });
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
};

exports.remove = function (userId, url, callback) {
  Song.update(
    { _creator: userId, url: url },
    { loved: false },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      orphanSongs.cleanForUserId(userId);
      callback(err, numberAffected);
    });
};
