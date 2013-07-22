/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.index = function (req, res) {
  models.songs.loved.findByUserId(
    req.user.id,
    function (err, songs) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send(songs);
    });
};

exports.create = function (req, res) {
  models.songs.loved.add(
    req.user.id,
    req.body.song,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
};

exports.update = function (req, res) {
  models.songs.loved.remove(
    req.user.id,
    req.body.url,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
};
