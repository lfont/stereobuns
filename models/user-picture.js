var URI     = require('URIjs'),
    config  = require('../lib/configuration'),
    request = require('../lib/request');

var DEFAULT_PICTURE_URL = '/img/user-picture.jpg';

exports.getURL = function (user, callback) {
  var userAccount = user.getDefaultAccount();

  if (!userAccount.userId) {
    return process.nextTick(function () {
      callback(null, DEFAULT_PICTURE_URL);
    });
  }

  if (userAccount.name === 'facebook') {
    return process.nextTick(function () {
      callback(null, 'https://graph.facebook.com/' + userAccount.userId + '/picture' +
                     '?redirect=1&type=square&height=300&width=300');
    });
  }

  if (userAccount.name === 'google') {
    return request.get(
      'https://www.googleapis.com/plus/v1/people/' + userAccount.userId +
      '?fields=image&key=' + config.google.apiKey,
      function (err, data) {
        if (err) {
          console.log(err);
          return callback(err);
        }

        var uri = new URI(data.image.url);
        uri.search({ sz: 300 });

        callback(null, uri.toString());
      });
  }
  
  return process.nextTick(function () {
    callback(null, DEFAULT_PICTURE_URL);
  });
};
