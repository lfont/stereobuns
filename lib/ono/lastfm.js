/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var request = require('./request');

var API_KEY = 'f9e5c8edc3025b33d88589d9f1ecb142';

exports.getArtworkUrl = function (images, size) {
  if (!images) {
    return null;
  }
  
  switch (size) {
    case 'small':
      return images[0]['#text'];
    case 'medium':
      return images[1]['#text'];
    case 'large':
      return images[2]['#text'];
    case 'extralarge':
      return images[3]['#text'];
    default:
     throw new Error('Image\'s size is not valid!');
  }
};

exports.callMethod = function (method, params, callback) {
  var paramsString = '';
  
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      paramsString += '&' + param + '=' + params[param];
    }
  }
  
  request.get(
    'http://ws.audioscrobbler.com/2.0/?method=' + method +
    '&api_key=' + API_KEY +
    '&format=json' +
    paramsString,
    function (err, res) {
      if (err) {
        return callback(err);
      }

      callback(null, res);
    });
};
