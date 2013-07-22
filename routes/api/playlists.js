/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.create = function (req, res) {
  models.playlists.create(
    req.user.id,
    req.body.name,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
};

exports.destroy = function (req, res) {
  models.playlists.delete(
    req.user.id,
    req.params.name,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
};

exports.index = function (req, res) {
  models.playlists.countSongsByPlaylists(
    req.user.id,
    function (err, playlists) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send(playlists);
    });
};

exports.show = function (req, res) {
  models.playlists.findByName(
    req.user.id,
    req.params.name,
    function (err, playlist) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send(playlist);
    });
};
