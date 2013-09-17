/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var tracksSearch = require('../../lib/tracks-search');

module.exports = function (app) {
  var appTracksSearch = tracksSearch.configure(app);

  exports.searchTracks = function (req, res) {
    appTracksSearch.searchTracks(
      req.user._id,
      req.params.description,
      function (tracks) {
        res.send(tracks);
      });
  };
  
  exports.searchArtistTopTracks = function (req, res) {
    appTracksSearch.searchArtistTopTracks(
      req.user._id,
      req.params.artist,
      function (tracks) {
        res.send(tracks);
      });
  };

  return exports;
};
