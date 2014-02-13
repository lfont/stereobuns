/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var EventEmitter = require('events').EventEmitter,
    path         = require('path'),
    request      = require('../../request');

function Resolver (name, settings) {
  this.info = {
    name: name,
    icon: path.join(__dirname, name, 'icon.png')
  };

  this.settings = settings;
}

Resolver.prototype.asyncRequest = function (url, callback) {
  var _this = this;

  request.get(url, function (err, tracks) {
    if (err) {
      return _this.log('Got error: ' + err.message);
    }
    
    callback(tracks);
  });
};

Resolver.prototype.getTracksStream = function (query) {
  var encodedQuery = encodeURIComponent(query.replace('"', '').replace("'", '')),
      tracksStream = new EventEmitter(),
      timeoutId;

  this.getTracks(encodedQuery, tracksStream);

  tracksStream.on('end', clearTimeout.bind(global, timeoutId));

  timeoutId = setTimeout(tracksStream.emit.bind(tracksStream, 'end'),
                         this.settings.timeout * 1000);

  return tracksStream;
};

Resolver.prototype.log = function (message) {
  // TODO: use a real logger
  console.log(message);
};

module.exports = Resolver;
