/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Song = require('./models').Song;

exports.findByUserId = function (userId, callback) {
  Song.find(
    { _creator: userId, playCount: { $gt: 0 } },
    null,
    { sort: { playCount: 1 }, limit: 50 },
    function (err, songs) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, { id: 'mostPlayed', songs: songs });
    });
};

exports.incrementPlayCount = function (userId, url, callback) {
  Song.update(
    { _creator: userId, url: url },
    { $inc: { playCount: 1 } },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};
