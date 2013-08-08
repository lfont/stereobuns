/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _    = require('underscore'),
    http = require('http');

var lastfmApiKey = 'f9e5c8edc3025b33d88589d9f1ecb142';

function asyncRequest (query, callback) {
  http.get(query, function (res) {
    var data = '';

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      var result = JSON.parse(data);
      callback(null, result);
    });
  }).on('error', function (err) {
    // TODO: handle error
    console.log("Got error: " + err.message);
    callback(err);
  });
}

exports.getTrackInfo = function (artist, name, callback) {
  asyncRequest(
    'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&' +
    'api_key=' + lastfmApiKey + '&' +
    'artist=' + artist + '&' +
    'track=' + name + '&' +
    'autocorrect=1&' +
    'format=json',
    function (err, res) {
      var album = null;

      if (err) {
        return callback(err);
      }

      if (!res.track) {
        return callback({ code: 'ERRNOTFOUND' });
      }

      if (res.track.album) {
        album = {
          name: res.track.album.title,
          artworkUrl: res.track.album.image[1]['#text']
        };
      }

      callback(null, {
        name: res.track.name,
        artist: res.track.artist.name,
        album: album
      });
    });
};

exports.getAlbumInfo = function (artist, name, callback) {
  asyncRequest(
    'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&' +
    'api_key=' + lastfmApiKey + '&' +
    'artist=' + artist + '&' +
    'album=' + name + '&' +
    'autocorrect=1&' +
    'format=json',
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
        tracks: tracks
      });
    });
};
