/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _       = require('underscore'),
    lastfm  = require('./lastfm');

exports.getInfo = function (artist, album, callback) {
  lastfm.callMethod(
    'album.getInfo',
    {
      artist: artist,
      album: album,
      autocorrect: 1
    },
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
        artworkUrl: lastfm.getArtworkUrl(res.album.image, 'large'),
        tracks: tracks
      });
    });
};
