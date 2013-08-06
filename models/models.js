/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose  = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  picture: String,
  invitationCode: String
});

exports.User = mongoose.model('User', userSchema);

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

exports.Song = mongoose.model('Song', songSchema);

var invitationSchema = new Schema({
  code: { type: String, required: true },
  used: Boolean
});

exports.Invitation = mongoose.model('Invitation', invitationSchema);
