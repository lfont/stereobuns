/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var securityMiddleware = require('../middleware/security'),
    tracksSearch       = require('../../lib/tracks-search');

module.exports = function (app) {
  var appTracksSearch = tracksSearch.configure(app);

  function searchTracks (req, res) {
    appTracksSearch.searchTracks(req.params.description, function (tracks) {
      res.send(tracks);
    });
  }
  
  function searchArtistTopTracks (req, res) {
    appTracksSearch.searchArtistTopTracks(req.params.artist, function (tracks) {
      res.send(tracks);
    });
  }

  app.get('/api/tracks/search/:description',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          searchTracks);
          
  app.get('/api/artists/:artist/tracks',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          searchArtistTopTracks);
};
