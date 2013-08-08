/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var http = require('http');

exports.get = function (url, callback) {
  http.get(url, function (res) {
    var data = '';

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      var result = JSON.parse(data);
      callback(null, result);
    });
  }).on('error', function (err) {
    // TODO: handle error
    console.log("Got error: " + err.message);
    callback(err);
  });
};
