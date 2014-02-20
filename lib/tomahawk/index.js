/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Engine    = require('./engine'),
    Relevance = require('./relevance');

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

function Tomahawk (options) {
  this.options = options;
  this.engine  = new Engine(options.resolvers);
}

Tomahawk.prototype.searchTracks = function (query, onTracksResult) {
  var _this        = this,
      tracks       = [],
      tracksStream = this.engine.getTracksStream(query),
      relevance    = new Relevance(query);

  tracksStream.on('track', function (track) {
    track.relevance = relevance.compute(track);
    
    if (track.relevance > 0.35) {
      tracks.push(track);

      if (tracks.length === _this.options.limit) {
        tracksStream.end();
      }
    }
  });

  tracksStream.on('end', function () {
    sortByProperty(tracks, 'relevance', true);
    onTracksResult.call(_this, tracks);
  });
};

module.exports = Tomahawk;
