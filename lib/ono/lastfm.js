/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _       = require('underscore'),
    request = require('./request');

var lastfmApiKey = 'f9e5c8edc3025b33d88589d9f1ecb142';

exports.getTrackInfo = function (artist, track, callback) {
  request.get(
    'http://ws.audioscrobbler.com/2.0/?method=track.getInfo' +
    '&api_key=' + lastfmApiKey +
    '&artist=' + artist +
    '&track=' + track +
    '&autocorrect=1' +
    '&format=json',
    function (err, res) {
      if (err) {
        return callback(err);
      }

      if (!res.track) {
        return callback({ code: 'ERRNOTFOUND' });
      }

      callback(null, {
        name: res.track.name,
        artist: res.track.artist.name,
        album: res.track.album ? res.track.album.title : null
      });
    });
};

exports.getAlbumInfo = function (artist, album, callback) {
  request.get(
    'http://ws.audioscrobbler.com/2.0/?method=album.getinfo' +
    '&api_key=' + lastfmApiKey +
    '&artist=' + artist +
    '&album=' + album +
    '&autocorrect=1' +
    '&format=json',
    function (err, res) {
      var tracks = [];

      if (err) {
        return callback(err);
      }

      if (!res.album) {
        return callback({ code: 'ERRNOTFOUND' });
      }

      if (res.album.tracks &&
          res.album.tracks.track &&
          _.isArray(res.album.tracks.track)) {
        res.album.tracks.track.forEach(function (track) {
          tracks.push({
            name: track.name
          });
        });
      }

      callback(null, {
        name: res.album.name,
        artist: res.album.artist,
        artworkUrl: res.album.image[2]['#text'],
        tracks: tracks
      });
    });
};
