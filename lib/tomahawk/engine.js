/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var EventEmitter = require('events').EventEmitter,
    path         = require('path'),
    Relevance    = require('./relevance');

function Engine (options) {
  var _this = this;

  this.resolvers = [];

  options.resolvers.forEach(function (name) {
    var resolver = require(path.join(__dirname, 'resolvers', name, 'resolver'));
    _this.resolvers.push(resolver);
  });
}

Engine.prototype.getTracksStream = function (query) {
  var _this        = this,
      tracksStream = new EventEmitter(),
      resultsCount = 0,
      relevance    = new Relevance(query);

  function onTrack (track) {
    track.relevance = relevance.compute(track);
    tracksStream.emit('track', track);
  }

  function onEnd () {
    resultsCount++;
    if (resultsCount === _this.resolvers.length) {
      tracksStream.emit('end');
    }
  }

  this.resolvers.forEach(function (resolver) {
    var tracksStream = resolver.getTracksStream(query);
    tracksStream.on('track', onTrack);
    tracksStream.on('end', onEnd);
  });

  return tracksStream;
};

module.exports = Engine;
