/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var async        = require('async'),
    TrackComment = require('./model').TrackComment,
    userPicture  = require('./user-picture');

exports.add = function (userId, artist, track, body, callback) {
  TrackComment.create({
      _creator: userId,
      artist: artist.toLowerCase(),
      track: track.toLowerCase(),
      body: body
    }, function (err, newComment) {
      if (err) {
        // TODO: handle error
        console.log(err);
      }
      callback(err, newComment);
    });
};

function setUserPicture (comment, callback) {
  userPicture.getURL(comment._creator, function (err, url) {
    if (err) {
      console.log(err);
      return callback(err);
    }
        
    comment = comment.toObject();
    delete comment._creator.linkedAccounts;
    comment._creator.picture = url;
    callback(null, comment);
  });
}

exports.find = function (artist, track, callback) {
  TrackComment
    .find({
      artist: artist.toLowerCase(),
      track: track.toLowerCase()
    })
    .sort('-createdAt')
    .select('-artist -track')
    .populate('_creator', 'name linkedAccounts')
    .exec(function (err, comments) {
      if (err) {
        console.log(err);
        return callback(err);
      }

      async.map(comments, setUserPicture, function (err, comments) {
        if (err) {
          console.log(err);
          return callback(err);
        }

        callback(null, comments);
      });
    });
};
