/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var config             = require('../lib/configuration'),
    securityMiddleware = require('./middleware/security'),
    comingSoon         = require('./coming-soon'),
    site               = require('./site'),
    // TODO: refacto
    albumsApi          = require('./api/albums'),
    trackCommentsApi   = require('./api/track-comments'),
    similarTracksApi   = require('./api/similar-tracks'),
    artistsApi         = require('./api/artists'),
    topAlbumsApi       = require('./api/top-albums'),
    artistAlbumsApi    = require('./api/artist-albums');

exports.register = function (app) {
  /* views */
  if (!config.isAccessible) {
    app.get('/', comingSoon.index);
    return;
  }

  app.get('/', site.index);
  
  app.get('/settings/:id',
          securityMiddleware.ensureAuthenticated,
          site.index);

  app.get('/search',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          site.index);

  app.get('/artist/:artist',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          site.index);

  app.get('/track/:artist/:track',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          site.index);

  app.get('/:user',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          site.index);

  app.get('/:user/tracks/:group',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          site.index);

  app.get('/:user/playlist/:name',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          site.index);


  /* api */
  require('./api/users')(app);
  require('./api/tracks-search')(app);
  require('./api/track-group')(app);
  require('./api/playlist')(app);

  app.get('/api/artists/:artist',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          artistsApi.show);

  app.get('/api/artists/:artist/albums',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          topAlbumsApi.index);

  app.get('/api/artists/:artist/albums/:album',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          artistAlbumsApi.show);
  
  app.get('/api/artists/:artist/tracks/:track/album',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          albumsApi.show);

  app.get('/api/artists/:artist/tracks/:track/similar',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          similarTracksApi.index);

  app.get('/api/artists/:artist/tracks/:track/comments',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          trackCommentsApi.index);

  app.post('/api/artists/:artist/tracks/:track/comments',
           securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
           trackCommentsApi.create);
};
