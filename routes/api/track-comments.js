/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.index = function (req, res) {
  models.trackComments.find(
    req.params.artist,
    req.params.track,
    function (err, comments) {
      if (err) {
        return res.send(400, { error: err });
      }
      res.send(comments);
    });
};

exports.create = function (req, res) {
  models.trackComments.add(
    req.user.id,
    req.params.artist,
    req.params.track,
    req.body.body,
    function (err, comment) {
      if (err) {
        return res.send(400, { error: err });
      }
      res.send({ success: true });
    });
};
