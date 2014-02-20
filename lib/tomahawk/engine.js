/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var path   = require('path'),
    Stream = require('./stream');

function Engine (resolverNames) {
  var _this = this;

  this.resolvers = [];

  resolverNames.forEach(function (name) {
    var resolver = require(path.join(__dirname, 'resolvers', name, 'resolver'));
    _this.resolvers.push(resolver);
  });
}

Engine.prototype.getTracksStream = function (query) {
  var tracksStream = new Stream();

  this.resolvers.forEach(function (resolver) {
    var stream = resolver.getTracksStream(query);
    tracksStream.add(stream);
  });

  return tracksStream;
};

module.exports = Engine;
