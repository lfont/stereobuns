/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var tracksSearch = require('../../lib/tracks-search');

function getQid (user) {
  return user._id + ':' + Date.now();
}

module.exports = function (app) {
  var appTracksSearch = tracksSearch.configure(app);

  exports.index = function (req, res) {
    var qid = getQid(req.user);
    appTracksSearch.search(qid, req.params.description, function (tracks) {
      res.send(tracks);
    });
  };

  return exports;
};
