/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var FacebookStrategy = require('passport-facebook').Strategy,
    models           = require('../../models'),
    config           = require('../configuration');

function onFacebookUserResponse (profile, done, err, user) {
  if (err) {
    return done(err, null);
  }

  if (!user) {
    models.users.create({
      email  : profile.emails[0].value,
      name   : profile.displayName,
      picture: 'https://graph.facebook.com/' +
               profile.id +
               '/picture?redirect=1&type=square&height=300&width=300'
    }, function (err, user) {
      if (err) {
        return done(err, null);
      }

      done(null, user);
    });
  } else {
    done(null, user);
  }
}

exports.initialize = function (passport) {
  passport.use(new FacebookStrategy({
    clientID    : config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL : config.oauthCallbackHost + '/auth/facebook/callback'
  }, function (accessToken, refreshToken, profile, done) {
    models.users.findByEmail(profile.emails[0].value,
                             onFacebookUserResponse.bind(this, profile, done));
  }));

  return {
    onRequest: passport.authenticate('facebook', {
      display: 'popup',
      scope: [
        'email'
      ]
    }),
    onCallback: passport.authenticate('facebook', {
      failureRedirect: '/auth/failure'
    })
  };
};
