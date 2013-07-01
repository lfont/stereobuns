/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var site        = require('./site'),
    user        = require('./user'),
    userApi     = require('./api/user'),
    playlistApi = require('./api/playlist');

function ensureAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    
    // respond with html page
    if (req.accepts('html')) {
        res.redirect('/');
        return;
    }

    res.status(401);
    
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Unauthorized' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Unauthorized');
}

exports.register = function (app) {
    app.get('/', site.index);
    app.get('/home', ensureAuthenticated, user.home);
    app.get('/search', ensureAuthenticated, user.home);
    app.get('/playlist/:name', ensureAuthenticated, user.home);
    
    app.get('/api/user/me', ensureAuthenticated, userApi.get);
    app.get('/api/user/me/playlist', ensureAuthenticated, playlistApi.all);
    app.get('/api/user/me/playlist/:name', ensureAuthenticated, playlistApi.get);
};
