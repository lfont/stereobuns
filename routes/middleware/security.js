/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

exports.ensureAuthenticated = function  (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.clearCookie('user');

  if (req.accepts('html')) {
    return res.redirect('/');
  }

  res.status(401);

  if (req.accepts('json')) {
    return res.send({ error: 'Unauthorized' });
  }

  res.type('txt').send('Unauthorized');
};

exports.ensureInvited = function  (req, res, next) {
  if (req.user.invitationCode && req.user.invitationCode !== '') {
    return next();
  }

  res.clearCookie('invitation');

  if (req.accepts('html')) {
    return res.redirect('/settings/account');
  }

  res.status(401);

  if (req.accepts('json')) {
    return res.send({ error: 'Unauthorized' });
  }

  res.type('txt').send('Unauthorized');
};
