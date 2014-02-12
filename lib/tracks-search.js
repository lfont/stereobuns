/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Tomahawk = require('./tomahawk'),
    ono      = require('./ono'),
    config   = require('./configuration');

function generateQid (userId, sequence) {
  return userId + ':' + Date.now() + ':' + (sequence || Math.random());
}

function sortByProperty (items, property, descending) {
  var greaterValue = descending ? -1 : 1,
      lesserValue  = descending ? 1 : -1;
  
  items.sort(function (a, b) {
    if (a[property] > b[property]) {
      return greaterValue;
    }

    if (a[property] < b[property]) {
      return lesserValue;
    }

    return 0;
  });
}

function aggregateResults (results) {
  var tracks = [],
      i, len;

  for (i = 0, len = results.length; i < len; i++) {
    tracks = tracks.concat(results[i].tracks);
  }

  return tracks;
}

function extractTopTracks (results) {
  var tracks = [],
      i, len;

  for (i = 0, len = results.length; i < len; i++) {
    if (results[i].tracks.length &&
        results[i].tracks[0].relevance > 1) {
      tracks.push(results[i].tracks[0]);
    }
  }

  return tracks;
}

exports.configure = function (app) {
  var exports        = {},
      qidQueryMap    = {},
      qidCallbackMap = {},
      qidResultMap   = {},
      tomahawk       = new Tomahawk(config.tomahawk),
      resolvers      = tomahawk.getResolvers();

  resolvers.forEach(function (resolver) {
    app.get('/tomahawk/resolvers/' + resolver.info.name + '/icon.png', function (req, res) {
      res.sendfile(resolver.info.icon);
    });
  });

  tomahawk.on('trackResults', function (result) {
    var qid = result.qid,
        tracks;

    if (!qidResultMap[qid]) {
      qidResultMap[qid] = [];
    }

    qidResultMap[qid].push(result);

    result.tracks.forEach(function (track) {
      var query = qidQueryMap[qid];
      track.relevance = ono.track.getRelevance(query, track);
    });

    if (qidResultMap[qid].length === resolvers.length) {
      tracks = aggregateResults(qidResultMap[qid]);
      sortByProperty(tracks, 'relevance', true);
      qidCallbackMap[qid]({
        qid: qid,
        tracks: tracks.slice(0, config.tomahawk.limit)
      });
      delete qidQueryMap[qid];
      delete qidCallbackMap[qid];
      delete qidResultMap[qid];
    }
  });

  exports.searchTracks = function (userId, query, callback) {
    var qid = generateQid(userId);
    qidQueryMap[qid] = query;
    qidCallbackMap[qid] = function (result) {
      callback(result.tracks);
    };
    tomahawk.search(qid, query);
  };
  
  exports.searchArtistTopTracks = function (userId, artist, callback) {
    var results = [],
        topTracksCount;
    
    function trackResultCallback (result) {
      var topTracks;
      results.push(result);
      if (results.length === topTracksCount) {
        sortByProperty(results, 'qid');
        topTracks = extractTopTracks(results);
        callback(topTracks);
      }
    }
    
    ono.artist.getTopTracks(artist, function (err, tracks) {
      var sequence = 1;
      
      if (err) {
        return callback(err, null);
      }
      
      topTracksCount = tracks.length;
      
      tracks.forEach(function (track) {
        var qid   = generateQid(userId, sequence++),
            query = track.artist + ' ' + track.name;
            
        qidQueryMap[qid] = query;
        qidCallbackMap[qid] = trackResultCallback;
        tomahawk.search(qid, query);
      });
    });
  };

  return exports;
};
