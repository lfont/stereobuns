/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var EventEmitter = require('events').EventEmitter,
    util         = require('util');

function Stream () {
  EventEmitter.call(this);

  var _this        = this,
      resultsCount = 0;

  this.streams = [];

  function onResolverTrack (track) {
    _this.emit('track', track);
  }

  function onResolverEnd () {
    resultsCount++;
    if (resultsCount === _this.streams.length) {
      _this.emit('end');
    }
  }

  this.add = function (stream) {
    stream.on('track', onResolverTrack);
    stream.on('end', onResolverEnd);
    this.streams.push(stream);
  };
}

util.inherits(Stream, EventEmitter);

Stream.prototype.end = function () {
  this.streams.forEach(function (stream) {
    stream.end();
  });
};

module.exports = Stream;
