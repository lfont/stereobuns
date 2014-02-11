/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var http  = require('http'),
    https = require('https');

function getContentType (headers) {
  var contentType = headers['content-type'];
  if (contentType) {
    contentType = contentType.replace(/;.*$/, '');
  }
  return contentType;
}

exports.get = function (url, callback) {
  var proto = url.indexOf('https') === 0 ? https : http;

  proto.get(url, function (res) {
    var contentType = getContentType(res.headers),
        data = '';

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      var result;

      switch (contentType) {
      case 'application/json':
      case 'text/javascript': // facebook oauth?!
        result = JSON.parse(data);
        break;
      default:
        result = data;
      }
      callback(null, result);
    });
  }).on('error', function (err) {
    console.log('Got error: ' + err.message);
    callback(err);
  });
};
