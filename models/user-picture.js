var URI     = require('URIjs'),
    config  = require('../lib/configuration'),
    request = require('../lib/request');

exports.set = function (user, callback) {
  if (user.picture) {
    // FIXME: old behavior
    return process.nextTick(function () {
      callback(null, user);
    });    
  }

  var userObject = user.toObject();
  userObject.id = userObject._id;
  delete userObject._id;

  var mainAccount = user.linkedAccounts[0];

  if (mainAccount.name === 'facebook') {
    userObject.picture = 'https://graph.facebook.com/' + mainAccount.userId + '/picture' +
                         '?redirect=1&type=square&height=300&width=300';

    return process.nextTick(function () {
      callback(null, userObject);
    });
  }

  if (mainAccount.name === 'google') {
    request.get('https://www.googleapis.com/plus/v1/people/' + mainAccount.userId + 
                '?fields=image&key=' + config.google.apiKey,
                function (err, data) {
                  var uri;

                  if (err) {
                    // TODO: handle error
                    console.log(err);
                    return callback(err);
                  }

                  uri = new URI(data.image.url);
                  uri.search({ sz: 300 });
                  userObject.picture = uri.toString();

                  callback(null, userObject);
                });
  }
};
