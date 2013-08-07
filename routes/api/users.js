/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.show = function (req, res) {
  res.send(req.user);
};

exports.destroy = function (req, res) {
  models.users.delete(
    req.user.id,
    function (err) {
      if (err) {
        return res.send(400, { error: err });
      }

      req.logout();
      res.clearCookie('user');
      res.clearCookie('invitation');
      res.send({ success: true });
    });
};
