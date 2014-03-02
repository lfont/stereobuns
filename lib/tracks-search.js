/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Tomahawk = require('./tomahawk'),
    ono      = require('./ono'),
    config   = require('./configuration');

function extractTopTracks (topTracksCount, results) {
  var tracks = [],
      i;

  for (i = 0; i < topTracksCount; i++) {
    if (results[i].length) {
      tracks.push(results[i][0]);
    }
  }

  return tracks;
}

exports.configure = function (app) {
  var exports  = {},
      tomahawk = new Tomahawk(config.tomahawk);

  tomahawk.engine.each(function (resolver) {
    app.get('/tomahawk/resolvers/' + resolver.info.name + '/icon.png', function (req, res) {
      res.sendfile(resolver.info.icon);
    });
  });

  exports.searchTracks = function (query, callback) {
    tomahawk.searchTracks(query, function (tracks) {
      callback(tracks);
    });
  };

  exports.searchTrack = function (query, trackId, callback) {
    tomahawk.searchTrack(query, trackId, function (track) {
      callback(track);
    });
  };
  
  exports.searchArtistTopTracks = function (artist, callback) {
    var _this        = this,
        results      = {},
        resultsCount = 0,
        topTracksCount;
    
    function onTracksResult (index, tracks) {
      var topTracks;
      results[index] = tracks;
      resultsCount++;

      if (resultsCount === topTracksCount) {
        topTracks = extractTopTracks(topTracksCount, results);
        callback(topTracks);
      }
    }
    
    ono.artist.getTopTracks(artist, function (err, tracks) {
      if (err) {
        return callback([]);
      }
      
      topTracksCount = tracks.length;
      
      for (var i = 0, len = tracks.length; i < len; i++) {
        var track = tracks[i],
            query = track.artist + ' ' + track.name;

        tomahawk.searchTracks(query, onTracksResult.bind(_this, i));
      }
    });
  };

  return exports;
};
