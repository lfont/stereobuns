/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var tomahawk = require('./tomahawk'),
    ono      = require('./ono'),
    config   = require('./configuration');

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
      qidCallbackMap[qid](tracks.slice(0, config.tomahawkSearchOptions.limit));
      delete qidQueryMap[qid];
      delete qidCallbackMap[qid];
      delete qidResultMap[qid];
    }
  });

  exports.search = function (qid, query, callback) {
    qidQueryMap[qid] = query;
    qidCallbackMap[qid] = callback;
    appTomahawk.search(qid, query);
  };

  return exports;
};
