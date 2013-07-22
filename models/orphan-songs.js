/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Song = require('./models').Song;

exports.cleanForUserId = function (userId, callback) {
  Song.remove({
    userId: userId,
    playlists: { $size: 0 },
    queueIndex: { $exists: false },
    $or: [ { loved: false }, { loved: { $exists: false } } ]
  },
  function (err, numberAffected, raw) {
    if (err) {
      // TODO: handle error
      console.log(err);
    }
    if (numberAffected) {
      console.log('Cleaning ' + numberAffected + ' songs for the user ' + userId);
    }
    if (callback) {
      callback(err, numberAffected);
    }
  });
};
