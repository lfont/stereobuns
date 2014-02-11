/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    models         = require('../../models'),
    config         = require('../configuration'),
    request        = require('../request');

function onGoogleProfileResponse (profile, done, err, googleProfile) {
  if (err) {
    return done(err, null);
  }

  models.users.create({
    email  : profile.emails[0].value,
    name   : googleProfile.displayName,
    picture: 'https://plus.google.com/s2/photos/profile/' +
             profile.id +
             '?sz=300'
  }, function (err, user) {
    if (err) {
      return done(err, null);
    }

    done(null, user);
  });
}

function onGoogleUserResponse (accessToken, profile, done, err, user) {
  if (err) {
    return done(err, null);
  }

  if (!user) {
    request.get('https://www.googleapis.com/plus/v1/people/me?access_token=' +
                accessToken,
                onGoogleProfileResponse.bind(this, profile, done));
  } else {
    done(null, user);
  }
}

exports.initialize = function (passport) {
  passport.use(new GoogleStrategy({
    clientID:     config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL:  config.oauthCallbackHost + '/auth/google/callback'
  }, function (accessToken, refreshToken, profile, done) {
    models.users.findByEmail(profile.emails[0].value,
                             onGoogleUserResponse.bind(this, accessToken, profile, done));
  }));

  return {
    onRequest: passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }),
    onCallback: passport.authenticate('google', {
      failureRedirect: '/auth/failure'
    })
  };
};
