/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var request = require('../request');

var API_KEY = 'f9e5c8edc3025b33d88589d9f1ecb142';

function cleanText (text) {
  return text.replace(/(?:\+|\-)/g, ' ');
}

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

exports.rewriteLinks = function (html) {
  var cleanedHtml = html;
  
  cleanedHtml = cleanedHtml.replace(
    /"http:\/\/www\.last\.fm\/music\/([-+!?%\w\d]+)(?:\/([-+!?%\w\d]+)(?:\/([-+!?%\w\d]+))?)?"(?!.*>Read more about)/gi,
    function (match, artist, album, track, offset, string) {
      if (track) {
        return '"/track/' + cleanText(artist) + '/' + cleanText(track) + '"';
      }
      if (album) {
        return match;
      }
      return '"/artist/' + cleanText(artist) + '"';
    });

  cleanedHtml = cleanedHtml.replace(
    /"http:\/\/www\.last\.fm\/tag\/([\w\d]+)"/gi,
    '"/search?q=#$1"');
    
  cleanedHtml = cleanedHtml.replace(
    /<a( +title="[\w.,@?!^=%&amp;:\/~+# -]*")? href="(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-])?"/gi,
    '$& target="_blank"');
  
  return cleanedHtml;
};
