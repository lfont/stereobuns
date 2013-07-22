/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.index = function (req, res) {
  models.songs.queued.findByUserId(
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
  models.songs.queued.add(
    req.user.id,
    req.body.song,
    req.body.params.index,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
};

exports.update = function (req, res) {
  models.songs.queued.remove(
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
