/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Engine    = require('./engine'),
    Relevance = require('./relevance'),
    query     = require('./query');

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

function getSearchTerm (track) {
  var searchTerm   = track.artist + ' ' + track.name,
      cleanedQuery = query.clean(searchTerm);

  return cleanedQuery;
}

function Tomahawk (options) {
  this.options = options;
  this.engine  = new Engine(options.resolvers);
}

Tomahawk.prototype.searchTracks = function (searchTerm, onTracksResult) {
  var _this        = this,
      tracks       = [],
      cleanedQuery = query.clean(searchTerm),
      tracksStream = this.engine.getTracksStream(cleanedQuery),
      relevance    = new Relevance(cleanedQuery);

  tracksStream.on('track', function (track) {
    track.relevance = relevance.compute(getSearchTerm(track));
    
    if (track.relevance >= 0.6) {
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

Tomahawk.prototype.searchTrack = function (searchTerm, trackId, onTrackResult) {
  var _this              = this,
      bestTrack          = null,
      bestTrackRelevance = 0,
      cleanedQuery       = query.clean(searchTerm),
      tracksStream       = this.engine.getTracksStream(cleanedQuery, trackId),
      relevance          = new Relevance(cleanedQuery);

  tracksStream.on('track', function (track) {
    var trackRelevance;

    if (track.trackId === trackId) {
      bestTrack = track;
      return tracksStream.end();
    }

    trackRelevance = relevance.compute(getSearchTerm(track));
    if (bestTrackRelevance < trackRelevance) {
      bestTrack = track;
      bestTrackRelevance = trackRelevance;
    }
  });

  tracksStream.on('end', function () {
    onTrackResult.call(_this, bestTrack);
  });
};

module.exports = Tomahawk;
