/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.create = function (req, res) {
  if (req.user.invitationCode && req.user.invitationCode !== '') {
    // re-set an invitation code is not permit.
    return res.send({ success: true });
  }

  models.users.setInvitation(req.user.id, req.body.code, function (err) {
    if (err) {
      res.send(400, { error: err });
      return;
    }

    res.send({ success: true });
  });
};
