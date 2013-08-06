/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var passport         = require('passport'),
    GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    https            = require('https'),
    models           = require('../models'),
    config           = require('./configuration');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  models.users.findById(id, function (err, user) {
    if (err) {
      return done(err, null);
    }

    done(null, user);
  });
});

// google
passport.use(new GoogleStrategy({
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  callbackURL: config.oauthCallbackHost + '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
  models.users.findByEmail(profile.emails[0].value, function (err, user) {
    if (err) {
      return done(err, null);
    }

    if (!user) {
      https.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + accessToken,
        function (res) {
          var data = '';

          res.on('data', function (chunk) {
            data += chunk;
          });

          res.on('end', function () {
            var plusProfile = JSON.parse(data);
            models.users.create({
              email: profile.emails[0].value,
              name: plusProfile.displayName,
              picture: plusProfile.image.url
            }, function (err, user) {
              if (err) {
                return done(err, null);
              }

              done(null, user);
            });
          });
        }).on('error', function (e) {
          done(e, null);
        });
    } else {
      done(null, user);
    }
  });
}));

// facebook
passport.use(new FacebookStrategy({
  clientID: config.facebookClientId,
  clientSecret: config.facebookClientSecret,
  callbackURL: config.oauthCallbackHost + '/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  models.users.findByEmail(profile.emails[0].value, function (err, user) {
    if (err) {
      return done(err, null);
    }

    if (!user) {
      https.get('https://graph.facebook.com/me?fields=picture&access_token=' + accessToken,
        function (res) {
          var data = '';

          res.on('data', function (chunk) {
            data += chunk;
          });

          res.on('end', function () {
            var facebookProfile = JSON.parse(data);

            models.users.create({
              email: profile.emails[0].value,
              name: profile.displayName,
              picture: facebookProfile.picture.data.url
            }, function (err, user) {
              if (err) {
                return done(err, null);
              }

              done(null, user);
            });
          });
        }).on('error', function (e) {
          done(e, null);
        });
    } else {
      done(null, user);
    }
  });
}));

exports.middleware = function (app) {
  function onAuthSuccess (req, res) {
    res.cookie('user', req.user._id, { maxAge: 60 * 3600 * 24, signed: true });

    if (req.user.invitationCode) {
      res.cookie('invitation', req.user.invitationCode, { maxAge: 60 * 3600 * 24, signed: true });
    }

    res.render('oauth/response', {
      title: 'Authentication Successful',
      success: true
    });
  }

  function onAuthFailure (req, res) {
    res.render('oauth/response', {
      title: 'Authentication Failed',
      success: false
    });
  }

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), function (req, res) {

  });

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: [
      'email'
    ]
  }), function (req, res) {

  });

  app.get('/oauth/failure', onAuthFailure);

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/oauth/failure' }),
    onAuthSuccess);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/oauth/failure' }),
    onAuthSuccess);

  app.post('/logout', function (req, res) {
    req.logout();
    res.clearCookie('user');
    res.clearCookie('invitation');
    res.send({ success: true });
  });
};
