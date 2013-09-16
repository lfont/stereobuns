/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var ono = require('../../lib/ono');

exports.index = function (req, res) {
  ono.artist.getTopTracks(
    req.params.artist,
    function (err, tracks) {
      if (err) {
        return res.send(400, { error: err });
      }

      res.send(tracks);
    });
};
