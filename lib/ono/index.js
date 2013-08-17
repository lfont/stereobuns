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

exports.getTrackInfo = function (artist, track, callback) {
  lastfm.getTrackInfo(artist, track, function (err, trackInfo) {
    if (err) {
      return callback(err);
    }

    if (trackInfo.album) {
      lastfm.getAlbumInfo(
        trackInfo.artist,
        trackInfo.album.name,
        function (err, albumInfo) {
          if (err) {
            // TODO: handle error
            console.log(err);
          } else {
            trackInfo.album.tracks = albumInfo.tracks;
          }

          callback(null, trackInfo);
        });
    } else {
      callback(null, trackInfo);
    }
  });
};

exports.getSongRelevance = function (query, song) {
  var artistRelevance = 0,
      trackRelevance  = 0,
      artist          = cleanText(song.artist).toLowerCase(),
      track           = cleanText(song.track).toLowerCase(),
      queryWords      = query.toLowerCase().split(' '),
      artistWords     = song.artist.split(' '),
      trackWords      = song.track.split(' '),
      relevance;

  queryWords.forEach(function (word) {
    if (artist.indexOf(word) > -1) {
      artistRelevance += 1;
    }

    if (track.indexOf(word) > -1) {
      trackRelevance += 1;
    }
  });

  if (artistRelevance < artistWords.length) {
    artistRelevance -= 1;
  }

  if (trackRelevance < trackWords.length) {
    trackRelevance -= 1;
  }

  if (queryWords.length === artistRelevance) {
    artistRelevance += trackRelevance ? 2 : 1;
  }

  if (queryWords.length === trackRelevance) {
    trackRelevance += artistRelevance ? 2 : 1;
  }

  return artistRelevance + trackRelevance;
};
