/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _       = require('underscore'),
    lastfm  = require('./lastfm');

exports.getInfo = function (artist, callback) {
  lastfm.callMethod(
    'artist.getInfo',
    {
      artist: artist,
      autocorrect: 1
    },
    function (err, res) {
      var artists = [];
      
      if (err) {
        return callback(err);
      }

      if (!res.artist) {
        return callback({ code: 'ERRNOTFOUND' });
      }
      
      if (res.artist.similar &&
          res.artist.similar.artist &&
          _.isArray(res.artist.similar.artist)) {
        res.artist.similar.artist.forEach(function (artist) {
          artists.push({
            name: artist.name,
            artworkUrl: lastfm.getArtworkUrl(artist.image, 'small'),
          });
        });
      }

      callback(null, {
        name: res.artist.name,
        artworkUrl: lastfm.getArtworkUrl(res.artist.image, 'extralarge'),
        similarArtists: artists,
        bio: res.artist.bio.content
      });
    });
};

exports.getTopTracks = function (artist, callback) {
  lastfm.callMethod(
    'artist.getTopTracks',
    {
      artist: artist,
      autocorrect: 1,
      limit: 5
    },
    function (err, res) {
      var tracks = [];
      
      if (err) {
        return callback(err);
      }
      
      if (res.toptracks &&
          res.toptracks.track &&
          _.isArray(res.toptracks.track)) {
        res.toptracks.track.forEach(function (track) {
          tracks.push({
            name: track.name,
            artist: track.artist.name,
            artworkUrl: lastfm.getArtworkUrl(track.image, 'small'),
          });
        });
      }
      
      callback(null, tracks);
    });
};

exports.getTopAlbums = function (artist, callback) {
  lastfm.callMethod(
    'artist.getTopAlbums',
    {
      artist: artist,
      autocorrect: 1,
      limit: 10
    },
    function (err, res) {
      var albums = [];
      
      if (err) {
        return callback(err);
      }
      
      if (res.topalbums &&
          res.topalbums.album &&
          _.isArray(res.topalbums.album)) {
        res.topalbums.album.forEach(function (album) {
          albums.push({
            name: album.name,
            artist: album.artist.name,
            artworkUrl: lastfm.getArtworkUrl(album.image, 'medium'),
          });
        });
      }
      
      callback(null, albums);
    });
};
