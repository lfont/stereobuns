/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var EventEmitter = require('events').EventEmitter,
    util         = require('util');

function Stream () {
  EventEmitter.call(this);

  var isEnd = false;

  this.end = function () {
    isEnd = true;
  };

  this.forEach = function (collection, onItem) {
    if (collection) {
      for (var i = 0, len = collection.length; i < len; i++) {
        if (isEnd) {
          break;
        }

        var item = onItem(collection[i]);
        
        if (item) {
          this.emit('track', item);
        }
      }
    }

    this.emit('end');
  };
}

util.inherits(Stream, EventEmitter);

module.exports = Stream;
