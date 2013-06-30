/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var passport       = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    models         = require('../models');

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
            models.user.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                picture: profile._json.picture
            }, function (err, user) {
                if (err) {
                    return done(err, null);
                }
                
                done(null, user);
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
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), function (req, res) {
        
    });
    
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/home');
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};
