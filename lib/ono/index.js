/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var lastfm   = require('./lastfm'),
    echonest = require('./echonest');

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
