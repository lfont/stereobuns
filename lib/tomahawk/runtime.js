/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var http       = require('http'),
    _          = require('underscore'),
    Observable = require('../observable');

function getContentType (headers) {
  var contentType = headers['content-type'];
  if (contentType) {
    contentType = contentType.replace(/;.*$/, '');
  }
  return contentType;
}

function Runtime () {
  _.extend(this, new Observable());
}

Runtime.prototype.addTrackResults = function (result) {
  this.trigger('trackResults:' + result.qid, result);
};

Runtime.prototype.log = function (message) {
  // TODO: use a real logger
  console.log(message);
};

Runtime.prototype.asyncRequest = function (query, callback) {
  var _this = this;

  http.get(query, function (res) {
    var contentType = getContentType(res.headers),
        data = '';

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      var result;
      switch (contentType) {
      case 'application/json':
        result = JSON.parse(data);
        break;
      default:
        result = data;
      }
      callback(result);
    });
  }).on('error', function (e) {
    _this.log("Got error: " + e.message);
  });
};

Runtime.prototype.capitalize = function (str) {
  return str.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};

module.exports = new Runtime();
