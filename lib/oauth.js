/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var passport         = require('passport'),
    GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    https            = require('https'),
    models           = require('../models');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    models.user.findById(id, function (err, user) {
        if (err) {
            return done(err, null);
        }
    
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: '74763019521.apps.googleusercontent.com',
    clientSecret: 'tVkqx2niF4z86TIbfvvDsZqt',
    callbackURL: 'http://soundrocket.lfont.me:3000/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
    models.user.findByEmail(profile.emails[0].value, function (err, user) {
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
                    models.user.create({
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

passport.use(new FacebookStrategy({
    clientID: '283807858430684',
    clientSecret: '55a9883765283d989336fca975aa97f1',
    callbackURL: 'http://soundrocket.lfont.me:3000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
    models.user.findByEmail(profile.emails[0].value, function (err, user) {
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

                    models.user.create({
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
    
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/home');
        });
    
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/home');
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};
