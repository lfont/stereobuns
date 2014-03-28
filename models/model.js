/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  invitationCode: String,
  linkedAccounts: {
    type: [
      {
        name: { type: String, required: true },
        userId: { type: String, required: true }
      }
    ],
    required: true
  }
});

userSchema.methods.getDefaultAccount = function () {
  return this.linkedAccounts[0];
};

exports.User = mongoose.model('User', userSchema);

exports.Song = mongoose.model('Song', new Schema({
  _creator: { type: Schema.ObjectId, ref: 'User', required: true, select: false },
  // track properties
  trackId: { type: String, required: true },
  artist: String,
  name: String,
  source: String,
  url: { type: String, required: true },
  artworkUrl: String,
  linkUrl: String,
  // extra properties
  loved: Boolean,
  queueIndex: { type: Number, select: false },
  queueTimestamp: { type: Number, select: false },
  playCount: { type: Number, select: false },
  playlists: { type: Array, select: false }
}));

exports.Invitation = mongoose.model('Invitation', new Schema({
  code: { type: String, required: true },
  used: Boolean
}));

exports.TrackComment = mongoose.model('TrackComment', new Schema({
  _creator: { type: Schema.ObjectId, ref: 'User', required: true },
  artist: String,
  track: String,
  body: { type: String, match: /^.{1,140}$/ },
  createdAt: { type: Date, default: Date.now }
}));
