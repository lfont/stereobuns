/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var TrackComment = require('./models').TrackComment;

exports.add = function (userId, artist, track, body, callback) {
  TrackComment.create({
      _creator: userId,
      artist: artist,
      track: track,
      body: body
    }, function (err, newComment) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, newComment);
    });
};

exports.find = function (artist, track, callback) {
  TrackComment
    .find({ artist: artist, track: track })
    .sort('-createdAt')
    .select('-artist -track')
    .populate('_creator', 'name picture')
    .exec(function (err, comments) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, comments);
    });
};
