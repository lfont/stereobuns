/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _       = require('underscore'),
    lastfm  = require('./lastfm'),
    album   = require('./album');

function cleanText (text) {
  var cleanedText = text || '',
      index       = cleanedText.indexOf('(');

  if (index > -1) {
    cleanedText = cleanedText.substring(0, index);
  }

  index = cleanedText.indexOf('[');

  if (index > -1) {
    cleanedText = cleanedText.substring(0, index);
  }

  return cleanedText;
}

function getInfo (artist, track, callback) {
  lastfm.callMethod(
    'track.getInfo',
    {
      artist: artist,
      track: track,
      autocorrect: 1
    },
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
}

exports.getAlbum = function (artist, track, callback) {
  getInfo(artist, track, function (err, trackInfo) {
    if (err) {
      return callback(err);
    }

    if (!trackInfo.album) {
      return callback(null, null);
    }

    album.getInfo(
      trackInfo.artist,
      trackInfo.album,
      function (err, albumInfo) {
        if (err) {
          return callback(err);
        }

        callback(null, albumInfo);
      });
  });
};

exports.getRelevance = function (description, track) {
  var artistRelevance  = 0,
      nameRelevance    = 0,
      artist           = cleanText(track.artist).toLowerCase(),
      name             = cleanText(track.name).toLowerCase(),
      descriptionWords = description.toLowerCase().split(' '),
      artistWords      = track.artist.split(' '),
      nameWords        = track.name.split(' '),
      relevance;

  descriptionWords.forEach(function (word) {
    if (artist.indexOf(word) > -1) {
      artistRelevance += 1;
    }

    if (name.indexOf(word) > -1) {
      nameRelevance += 1;
    }
  });

  if (artistRelevance < artistWords.length) {
    artistRelevance -= 1;
  }

  if (nameRelevance < nameWords.length) {
    nameRelevance -= 1;
  }

  if (descriptionWords.length === artistRelevance) {
    artistRelevance += nameRelevance ? 2 : 1;
  }

  if (descriptionWords.length === nameRelevance) {
    nameRelevance += artistRelevance ? 2 : 1;
  }

  return artistRelevance + nameRelevance;
};

exports.getSimilarTracks = function (artist, track, callback) {
  lastfm.callMethod(
    'track.getSimilar',
    {
      artist: artist,
      track: track,
      autocorrect: 1,
      limit: 5
    },
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
            artworkUrl: lastfm.getArtworkUrl(track.image, 'small'),
          });
        });
      }
      
      callback(null, tracks);
    });
};
