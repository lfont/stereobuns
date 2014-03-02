/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var path   = require('path'),
    Stream = require('./stream');

function Engine (resolverNames) {
  var _this = this;

  this.resolversMap = {};

  resolverNames.forEach(function (name) {
    var resolver = require(path.join(__dirname, 'resolvers', name, 'resolver'));
    _this.resolversMap[name] = resolver;
  });
}

Engine.prototype.getResolverByTrackId = function (trackId) {
  var name = trackId.replace(/\d/g, '');
  return this.resolversMap[name];
};

Engine.prototype.each = function (onResolver) {
  for (var name in this.resolversMap) {
    if (this.resolversMap.hasOwnProperty(name)) {
      onResolver.call(this, this.resolversMap[name]);
    }
  }
};

Engine.prototype.getTracksStream = function (query, trackId) {
  var tracksStream = new Stream(),
      resolver;

  if (trackId) {
    resolver = this.getResolverByTrackId(trackId);
  }

  if (resolver) {
    tracksStream.add(resolver.getTracksStream(query));
  } else {
    this.each(function (resolver) {
      var stream = resolver.getTracksStream(query);
      tracksStream.add(stream);
    });
  }

  return tracksStream;
};

module.exports = Engine;
