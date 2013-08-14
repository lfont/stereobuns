/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Tomahawk = require('./tomahawk'),
    ono      = require('./ono'),
    config   = require('./configuration');

function aggregateTracks (results) {
  var tracks = [],
      i, len;

  results.sort(function (a, b) {
    if (a.weight > b.weight) {
      return -1;
    }

    if (a.weight < b.weight) {
      return 1;
    }

    return 0;
  });

  for (i = 0, len = results.length; i < len; i++) {
    tracks = tracks.concat(results[i].results);
  }

  return tracks;
}

exports.initialize = function (app) {
  var exports  = {},
      tomahawk = new Tomahawk(config.tomahawkSearchServices, app);

  exports.search = function (qid, query, callback) {
    tomahawk.search(qid, query, function (results) {
      var tracks       = aggregateTracks(results),
          sortedTracks = ono.sortByRevelance(tracks);

      callback(sortedTracks.slice(0, config.tomahawkSearchOptions.limit));
    });
  };

  return exports;
};
