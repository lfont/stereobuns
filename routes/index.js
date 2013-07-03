/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var site             = require('./site'),
    user             = require('./user'),
    usersApi         = require('./api/users'),
    playlistsApi     = require('./api/playlists'),
    playlistSongsApi = require('./api/playlist-songs'),
    lovedSongsApi    = require('./api/loved-songs');

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
    /* views */
    app.get('/', site.index);
    app.get('/home', ensureAuthenticated, user.home);
    app.get('/search', ensureAuthenticated, user.home);
    app.get('/songs/:name', ensureAuthenticated, user.home);
    app.get('/playlist/:name', ensureAuthenticated, user.home);
    
    /* api */
    app.get('/api/users/me', ensureAuthenticated, usersApi.show);
    
    app.get('/api/users/me/playlists', ensureAuthenticated, playlistsApi.index);
    app.get('/api/users/me/playlists/:name', ensureAuthenticated, playlistsApi.show);
    
    app.post('/api/users/me/playlists/:name/songs', ensureAuthenticated, playlistSongsApi.create);
    app.delete('/api/users/me/playlists/:name/songs/:id', ensureAuthenticated, playlistSongsApi.destroy);
    
    app.get('/api/users/me/songs/loved', ensureAuthenticated, lovedSongsApi.index);
    app.post('/api/users/me/songs/loved', ensureAuthenticated, lovedSongsApi.create);
    app.put('/api/users/me/songs/loved', ensureAuthenticated, lovedSongsApi.update);
};
