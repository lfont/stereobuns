/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Engine = require('./engine');

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
  this.engine  = new Engine(options);
}

Tomahawk.prototype.searchTracks = function (query, onTracksResult) {
  var _this        = this,
      tracks       = [],
      tracksStream = this.engine.getTracksStream(query);

  tracksStream.on('track', function (track) {
    tracks.push(track);
  });

  tracksStream.on('end', function () {
    sortByProperty(tracks, 'relevance', true);
    onTracksResult.call(_this, tracks.slice(0, _this.options.limit));
  });
};

module.exports = Tomahawk;
