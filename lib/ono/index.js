/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var lastfm = require('./lastfm');

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

exports.getAlbum = function (artist, track, callback) {
  lastfm.getTrackInfo(artist, track, function (err, trackInfo) {
    if (err) {
      return callback(err);
    }

    if (!trackInfo.album) {
      return callback(null, null);
    }

    lastfm.getAlbumInfo(
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

exports.getTrackRelevance = function (description, track) {
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
  lastfm.getSimilarTracks(artist, track, function (err, tracks) {
    if (err) {
      return callback(err);
    }
    
    callback(null, tracks);
  });
};
