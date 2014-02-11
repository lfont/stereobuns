/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var passport = require('passport'),
    models   = require('../../models'),
    facebook = require('./facebook'),
    google   = require('./google');

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

function onAuthSuccess (req, res) {
  res.cookie('user',
             { name: req.user.name },
             { maxAge: 60 * 3600 * 24 });

  if (req.user.invitationCode) {
    res.cookie('invitation',
               { code: req.user.invitationCode },
               { maxAge: 60 * 3600 * 24 });
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

exports.middleware = function (app) {
  var facebookAuth = facebook.initialize(passport),
      googleAuth   = google.initialize(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook', facebookAuth.onRequest);

  app.get('/auth/facebook/callback', facebookAuth.onCallback, onAuthSuccess);

  app.get('/auth/google', googleAuth.onRequest);

  app.get('/auth/google/callback', googleAuth.onCallback, onAuthSuccess);

  app.get('/auth/failure', onAuthFailure);

  app.post('/logout', function (req, res) {
    req.logout();
    res.clearCookie('user');
    res.clearCookie('invitation');
    res.send({ success: true });
  });
};
