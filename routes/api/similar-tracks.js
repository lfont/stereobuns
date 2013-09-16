/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var ono = require('../../lib/ono');

exports.index = function (req, res) {
  ono.track.getSimilarTracks(
    req.params.artist,
    req.params.track,
    function (err, tracks) {
      if (err) {
        return res.send(400, { error: err });
      }

      res.send(tracks);
    });
};
