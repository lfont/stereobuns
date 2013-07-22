/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.create = function (req, res) {
  models.playlists.addSong(
    req.user.id,
    req.params.name,
    req.body,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
};

exports.destroy = function (req, res) {
  models.playlists.removeSong(
    req.user.id,
    req.params.name,
    req.params.id,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
};
