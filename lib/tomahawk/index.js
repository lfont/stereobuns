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

Tomahawk.prototype.searchTrack = function (query, trackId, onTrackResult) {
  var _this              = this,
      bestTrack          = null,
      bestTrackRelevance = 0,
      tracksStream       = this.engine.getTracksStream(query, trackId),
      relevance          = new Relevance(query);

  tracksStream.on('track', function (track) {
    var trackRelevance;

    if (track.id === trackId) {
      bestTrack = track;
      return tracksStream.end();
    }

    trackRelevance = relevance.compute(track);
    if (!bestTrack || bestTrackRelevance < trackRelevance) {
      bestTrack = track;
      bestTrackRelevance = trackRelevance;
    }
  });

  tracksStream.on('end', function () {
    onTrackResult.call(_this, bestTrack);
  });
};

module.exports = Tomahawk;
