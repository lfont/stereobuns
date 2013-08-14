/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var tracksService = require('../../lib/tracks-service');

function getQid (user) {
  return user._id + ':' + Date.now().toString();
}

module.exports = function (app) {
  var tracksSrv = tracksService.initialize(app);

  exports.index = function (req, res) {
    var qid = getQid(req.user);
    tracksSrv.search(qid, req.params.query, function (tracks) {
      res.send(tracks);
    });
  };

  return exports;
};
