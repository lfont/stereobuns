/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var site               = require('./site'),
    usersApi           = require('./api/users'),
    playlistsApi       = require('./api/playlists'),
    playlistSongsApi   = require('./api/playlist-songs'),
    lovedSongsApi      = require('./api/loved-songs'),
    queuedSongsApi     = require('./api/queued-songs'),
    mostPlayedSongsApi = require('./api/most-played-songs');

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.clearCookie('user');

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
  app.get('/search', ensureAuthenticated, site.index);
  app.get('/songs/:name', ensureAuthenticated, site.index);
  app.get('/playlist/:name', ensureAuthenticated, site.index);

  /* api */
  app.get('/api/users/me', ensureAuthenticated, usersApi.show);

  app.get('/api/users/me/playlists', ensureAuthenticated, playlistsApi.index);
  app.post('/api/users/me/playlists', ensureAuthenticated, playlistsApi.create);
  app.get('/api/users/me/playlists/:name', ensureAuthenticated, playlistsApi.show);
  app.delete('/api/users/me/playlists/:name', ensureAuthenticated, playlistsApi.destroy);

  app.post('/api/users/me/playlists/:name/songs', ensureAuthenticated, playlistSongsApi.create);
  app.delete('/api/users/me/playlists/:name/songs/:id', ensureAuthenticated, playlistSongsApi.destroy);

  app.get('/api/users/me/songs/loved', ensureAuthenticated, lovedSongsApi.index);
  app.post('/api/users/me/songs/loved', ensureAuthenticated, lovedSongsApi.create);
  app.put('/api/users/me/songs/loved', ensureAuthenticated, lovedSongsApi.update);

  app.get('/api/users/me/songs/queued', ensureAuthenticated, queuedSongsApi.index);
  app.post('/api/users/me/songs/queued', ensureAuthenticated, queuedSongsApi.create);
  app.put('/api/users/me/songs/queued', ensureAuthenticated, queuedSongsApi.update);

  app.get('/api/users/me/songs/mostplayed', ensureAuthenticated, mostPlayedSongsApi.index);
  app.post('/api/users/me/songs/mostplayed', ensureAuthenticated, mostPlayedSongsApi.create);
};
