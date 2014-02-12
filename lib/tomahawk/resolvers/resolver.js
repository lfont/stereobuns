/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var path    = require('path'),
    request = require('../../request');

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

Resolver.prototype.search = function (query, onSearchResult) {
  var cleanQuery = encodeURIComponent(query.replace('"', '').replace("'", ''));

  this._innerSearch(cleanQuery, onSearchResult);

  // TODO: clear the timeout if the request succeed.
  setTimeout(onSearchResult.bind(this, []),
             this.settings.timeout * 1000);
};

Resolver.prototype.log = function (message) {
  // TODO: use a real logger
  console.log(message);
};

module.exports = Resolver;
