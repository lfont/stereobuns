/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var config             = require('../lib/configuration'),
    comingSoon         = require('./coming-soon'),
    site               = require('./site'),
    usersApi           = require('./api/users'),
    userInvitationApi  = require('./api/user-invitation'),
    playlistsApi       = require('./api/playlists'),
    playlistSongsApi   = require('./api/playlist-songs'),
    lovedSongsApi      = require('./api/loved-songs'),
    queuedSongsApi     = require('./api/queued-songs'),
    mostPlayedSongsApi = require('./api/most-played-songs'),
    artistTracksApi    = require('./api/artist-tracks'),
    artistAlbumsApi    = require('./api/artist-albums');

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.clearCookie('user');

  if (req.accepts('html')) {
    return res.redirect('/');
  }

  res.status(401);

  if (req.accepts('json')) {
    return res.send({ error: 'Unauthorized' });
  }

  res.type('txt').send('Unauthorized');
}

function ensureInvited (req, res, next) {
  if (req.user.invitationCode && req.user.invitationCode !== '') {
    return next();
  }

  res.clearCookie('invitation');

  if (req.accepts('html')) {
    return res.redirect('/settings/account');
  }

  res.status(401);

  if (req.accepts('json')) {
    return res.send({ error: 'Unauthorized' });
  }

  res.type('txt').send('Unauthorized');
}

exports.register = function (app) {
  /* views */
  if (!config.isAccessible) {
    app.get('/', comingSoon.index);
    return;
  }

  app.get('/', site.index);
  app.get('/settings/:id', ensureAuthenticated, site.index);
  app.get('/search', ensureAuthenticated, ensureInvited, site.index);
  app.get('/songs/:id', ensureAuthenticated, ensureInvited, site.index);
  app.get('/playlist/:name', ensureAuthenticated, ensureInvited, site.index);
  app.get('/artist/:artistName/song/:songName', ensureAuthenticated, ensureInvited, site.index);

  /* api */
  app.get('/api/users/me', ensureAuthenticated, usersApi.show);
  app.delete('/api/users/me', ensureAuthenticated, usersApi.destroy);

  app.post('/api/users/me/invitation', ensureAuthenticated, userInvitationApi.create);

  app.get('/api/users/me/playlists', ensureAuthenticated, ensureInvited,  playlistsApi.index);
  app.post('/api/users/me/playlists', ensureAuthenticated, ensureInvited, playlistsApi.create);
  app.get('/api/users/me/playlists/:name', ensureAuthenticated, ensureInvited, playlistsApi.show);
  app.delete('/api/users/me/playlists/:name', ensureAuthenticated, ensureInvited, playlistsApi.destroy);

  app.post('/api/users/me/playlists/:name/songs', ensureAuthenticated, ensureInvited, playlistSongsApi.create);
  app.delete('/api/users/me/playlists/:name/songs/:id', ensureAuthenticated, ensureInvited, playlistSongsApi.destroy);

  app.get('/api/users/me/songs/loved', ensureAuthenticated, ensureInvited, lovedSongsApi.index);
  app.post('/api/users/me/songs/loved', ensureAuthenticated, ensureInvited, lovedSongsApi.create);
  app.put('/api/users/me/songs/loved', ensureAuthenticated, ensureInvited, lovedSongsApi.update);

  app.get('/api/users/me/songs/queued', ensureAuthenticated, ensureInvited, queuedSongsApi.index);
  app.post('/api/users/me/songs/queued', ensureAuthenticated, ensureInvited, queuedSongsApi.create);
  app.put('/api/users/me/songs/queued', ensureAuthenticated, ensureInvited, queuedSongsApi.update);

  app.get('/api/users/me/songs/mostplayed', ensureAuthenticated, ensureInvited, mostPlayedSongsApi.index);
  app.post('/api/users/me/songs/mostplayed', ensureAuthenticated, ensureInvited, mostPlayedSongsApi.create);

  app.get('/api/artists/:artistName/tracks/:trackName', ensureAuthenticated, ensureInvited, artistTracksApi.show);
  app.get('/api/artists/:artistName/albums/:albumName', ensureAuthenticated, ensureInvited, artistAlbumsApi.show);
};
