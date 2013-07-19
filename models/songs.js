/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose = require('mongoose'),
    _        = require('underscore');

var Schema = mongoose.Schema;

var songSchema = new Schema({
  userId: { type: Schema.ObjectId, required: true, select: false },
  url: { type: String, required: true },
  artist: String,
  album: String,
  track: String,
  source: String,
  linkUrl: String,
  artworkUrl: String,
  loved: Boolean,
  queueIndex: { type: Number, select: false },
  queueTimestamp: { type: Number, select: false },
  playCount: { type: Number, select: false },
  playlists: { type: Array, select: false }
});

var Song = exports.Song = mongoose.model('Song', songSchema);

function sanitize (songData) {
  // TODO: should be done by the client
  delete songData._id;
  delete songData.playlists;
  return songData;
}

exports.loved = function (userId, callback) {
  Song.find({ userId: userId, loved: true }, function (err, songs) {
    if (err) {
      // TODO: handle error
      console.log(err);
    }
    callback(err, { id: 'loved', songs: songs });
  });
};

exports.love = function (userId, songData, callback) {
  var song = _.extend(sanitize(songData), { loved: true });
  Song.update(
    { userId: userId, url: song.url },
    song,
    { upsert: true },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};

exports.unlove = function (userId, url, callback) {
  Song.update(
    { userId: userId, url: url },
    { loved: false },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};

exports.queued = function (userId, callback) {
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

exports.enqueue = function (userId, songData, index, callback) {
  var song = _.extend(sanitize(songData),
                      { queueIndex: index, queueTimestamp: Date.now() });

  Song.update(
    { userId: userId, url: song.url },
    song,
    { upsert: true },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};

exports.dequeue = function (userId, url, callback) {
  Song.update(
    { userId: userId, url: url },
    { $unset: { queueIndex: '', queueTimestamp: '' } },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};

exports.mostPlayed = function (userId, callback) {
  Song.find({ userId: userId, playCount: { $gt: 0 } },
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
    { userId: userId, url: url },
    { $inc: { playCount: 1 } },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};

exports.addToPlaylist = function (userId, playlistName, songData, callback) {
  Song.count(
    { userId: userId, url: songData.url, playlists: playlistName },
    function (err, count) {
      var song;
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      if (!count) {
        song = _.extend(sanitize(songData), { $addToSet: { playlists: playlistName } });
        Song.update(
          { userId: userId, url: song.url },
          song,
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

exports.removeFromPlaylist = function (userId, playlistName, songId, callback) {
  Song.update(
    { userId: userId, _id: songId },
    { $pull: { playlists: playlistName } },
    function (err, numberAffected, raw) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, numberAffected);
    });
};
