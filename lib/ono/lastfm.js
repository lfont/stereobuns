/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _       = require('underscore'),
    request = require('./request');

var lastfmApiKey = 'f9e5c8edc3025b33d88589d9f1ecb142';

function getArtworkUrl (images, size) {
  if (!images) {
    return null;
  }
  
  switch (size) {
    case 'small':
      return images[0]['#text'];
    case 'medium':
      return images[1]['#text'];
    case 'large':
      return images[2]['#text'];
    case 'extralarge':
      return images[3]['#text'];
    default:
     throw new Error('Image\'s size is not valid!');
  }
}

exports.getArtistInfo = function (artist, callback) {
  request.get(
    'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo' +
    '&api_key=' + lastfmApiKey +
    '&artist=' + artist +
    '&autocorrect=1' +
    '&format=json',
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
            artworkUrl: getArtworkUrl(artist.image, 'small'),
          });
        });
      }

      callback(null, {
        name: res.artist.name,
        artworkUrl: getArtworkUrl(res.artist.image, 'extralarge'),
        similarArtists: artists,
        bio: res.artist.bio.content
      });
    });
};

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
        artworkUrl: getArtworkUrl(res.album.image, 'large'),
        tracks: tracks
      });
    });
};

exports.getSimilarTracks = function (artist, track, callback) {
  request.get(
    'http://ws.audioscrobbler.com/2.0/?method=track.getsimilar' +
    '&api_key=' + lastfmApiKey +
    '&artist=' + artist +
    '&track=' + track +
    '&autocorrect=1' +
    '&limit=5' +
    '&format=json',
    function (err, res) {
      var tracks = [];
      
      if (err) {
        return callback(err);
      }
      
      if (res.similartracks &&
          res.similartracks.track &&
          _.isArray(res.similartracks.track)) {
        res.similartracks.track.forEach(function (track) {
          tracks.push({
            name: track.name,
            artist: track.artist.name,
            artworkUrl: getArtworkUrl(track.image, 'small'),
          });
        });
      }
      
      callback(null, tracks);
    });
};
