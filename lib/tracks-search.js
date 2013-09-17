/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var tomahawk = require('./tomahawk'),
    ono      = require('./ono'),
    config   = require('./configuration');

function generateQid (userId, sequence) {
  return userId + ':' + (sequence || Math.random()) + ':' + Date.now();
}

function aggregateResults (results) {
  var tracks = [],
      i, len;

  for (i = 0, len = results.length; i < len; i++) {
    tracks = tracks.concat(results[i].results);
  }

  return tracks;
}

function sortByRelevance (tracks) {
  tracks.sort(function (a, b) {
    if (a.relevance > b.relevance) {
      return -1;
    }

    if (a.relevance < b.relevance) {
      return 1;
    }

    return 0;
  });
}

function sortByQid (trackResults) {
  trackResults.sort(function (a, b) {
    if (a.qid > b.qid) {
      return -1;
    }

    if (a.qid < b.qid) {
      return 1;
    }

    return 0;
  });
}

function extractTracks (trackResults) {
  var tracks = [],
      i, len;

  for (i = 0, len = trackResults.length; i < len; i++) {
    tracks.push(trackResults[i].track);
  }

  return tracks;
}

exports.configure = function (app) {
  var exports        = {},
      qidQueryMap    = {},
      qidCallbackMap = {},
      qidResultMap   = {},
      appTomahawk    = tomahawk.configure(app, config.tomahawkSearchServices),
      resolversCount = appTomahawk.getResolvers().length;

  appTomahawk.on('trackResults', function (result) {
    var qid = result.qid,
        tracks;

    if (!qidResultMap[qid]) {
      qidResultMap[qid] = [];
    }

    qidResultMap[qid].push(result);

    result.results.forEach(function (track) {
      var query = qidQueryMap[qid];
      track.relevance = ono.track.getRelevance(query, track);
    });

    if (qidResultMap[qid].length === resolversCount) {
      tracks = aggregateResults(qidResultMap[qid]);
      sortByRelevance(tracks);
      qidCallbackMap[qid](qid, tracks.slice(0, config.tomahawkSearchOptions.limit));
      delete qidQueryMap[qid];
      delete qidCallbackMap[qid];
      delete qidResultMap[qid];
    }
  });

  exports.searchTracks = function (userId, query, callback) {
    var qid = generateQid(userId);
    qidQueryMap[qid] = query;
    qidCallbackMap[qid] = function (qid, tracks) {
      callback(tracks);
    };
    appTomahawk.search(qid, query);
  };
  
  exports.searchArtistTopTracks = function (userId, artist, callback) {
    var topTrackResults = [],
        topTracksCount;
    
    function trackResultsCallback (qid, tracks) {
      var topTracks;
      topTrackResults.push({ qid: qid, track: tracks[0] });
      if (topTrackResults.length === topTracksCount) {
        sortByQid(topTrackResults);
        topTracks = extractTracks(topTrackResults);
        callback(topTracks);
      }
    }
    
    ono.artist.getTopTracks(artist, function (err, tracks) {
      var sequence = 0;
      
      if (err) {
        return callback(err, null);
      }
      
      topTracksCount = tracks.length;
      
      tracks.forEach(function (track) {
        var qid   = generateQid(userId, sequence++),
            query = track.artist + ' ' + track.name;
            
        qidQueryMap[qid] = query;
        qidCallbackMap[qid] = trackResultsCallback;
        appTomahawk.search(qid, query);
      });
    });
  };

  return exports;
};
