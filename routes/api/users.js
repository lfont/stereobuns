/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var securityMiddleware = require('../middleware/security'),
    models             = require('../../models');


function getUser (req, res) {
  if (req.params.user === 'me') {
      res.send(req.user);
  } else {
    models.users.findByNickname(req.params.user, function (err, user) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      
      res.send(user);
    });
  }
}

function deleteUser (req, res) {
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
}

function setInvitationCode (req, res) {
  if (req.user.invitationCode && req.user.invitationCode !== '') {
    // re-set an invitation code is not permit.
    return res.send(400, { error: { code: 'ERREXISTS' } });
  }

  models.users.setInvitation(req.user.id, req.body.code, function (err) {
    if (err) {
      res.send(400, { error: err });
      return;
    }

    res.cookie('invitation',
               { code: req.body.code },
               { maxAge: 60 * 3600 * 24 });
    res.send({ success: true });
  });
}


module.exports = function (app) {
  app.get('/api/users/:user',
          securityMiddleware.ensureAuthenticated,
          getUser);

  app.delete('/api/users/me',
             securityMiddleware.ensureAuthenticated,
             deleteUser);

  app.post('/api/users/me/invitation',
           securityMiddleware.ensureAuthenticated,
           setInvitationCode);
};
