/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var EventEmitter = require('events').EventEmitter,
    util         = require('util'),
    path         = require('path');

function Tomahawk (options) {
  EventEmitter.call(this);

  var resolvers = [];

  function loadResolver (name) {
    var resolver = require(path.join(__dirname, 'resolvers', name, 'resolver'));
    resolvers.push(resolver);
  }

  this.getResolvers = function () {
    return resolvers;
  };

  options.resolvers.forEach(function (name) {
    loadResolver(name);
  });
}

util.inherits(Tomahawk, EventEmitter);

Tomahawk.prototype.search = function (qid, query) {
  var _this        = this,
      resolvers    = this.getResolvers(),
      resultsCount = 0;

  function onSearchResult (tracks) {
    if (resultsCount < resolvers.length) {
      _this.emit('trackResults', {
        qid: qid,
        tracks: tracks
      });
    }

    resultsCount++;
  }

  resolvers.forEach(function (resolver) {
    resolver.search(query, onSearchResult);
  });
};

module.exports = Tomahawk;
