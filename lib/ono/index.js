/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var lastfm = require('./lastfm');

function cleanText (text) {
  var cleanedText = text,
      index       = text.indexOf('(');

  if (index > -1) {
    cleanedText = cleanedText.substring(index);
  }

  index = cleanedText.indexOf('[');

  if (index > -1) {
    cleanedText = cleanedText.substring(index);
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
      queryWords      = query.toLowerCase().split(' '),
      artist          = cleanText(song.artist).toLowerCase(),
      track           = cleanText(song.track).toLowerCase(),
      songWords       = artist.split(' ').concat(track.split(' ')),
      relevance;

  queryWords.forEach(function (word) {
    if (artist.indexOf(word) > -1) {
      artistRelevance++;
    }

    if (track.indexOf(word) > -1) {
      trackRelevance++;
    }
  });

  if (queryWords.length === artistRelevance) {
    artistRelevance += trackRelevance ? 2 : 1;
  }

  if (queryWords.length === trackRelevance) {
    trackRelevance += artistRelevance ? 2 : 1;
  }

  relevance = artistRelevance + trackRelevance;

  relevance -= Math.abs(queryWords.length - songWords.length);

  return relevance;
};
