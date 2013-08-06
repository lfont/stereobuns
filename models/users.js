/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var User       = require('./models').User,
    Invitation = require('./models').Invitation;

exports.create = function (userData, callback) {
  User.create(userData, function (err, user) {
    if (err) {
      // TODO: handle error
      console.log(err);
    }
    callback(err, user);
  });
};

exports.findById = function (id, callback) {
  User.findById(id, function (err, user) {
    if (err) {
      // TODO: handle error
      console.log(err);
    }
    callback(err, user);
  });
};

exports.findByEmail = function (email, callback) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      // TODO: handle error
      console.log(err);
    }
    callback(err, user);
  });
};

exports.setInvitation = function (id, code, callback) {
  Invitation.findOne({ code: code }, function (err, invitation) {
    if (err) {
      // TODO: handle error
      console.log(err);
      return callback(err);
    }

    if (!invitation || invitation.used) {
      return callback({ code: 'ERRINVALID' });
    }

    User.update(
      { _id: id },
      { invitationCode: code },
      function (err, numberAffected, raw) {
        if (err) {
          // TODO: handle error
          console.log(err);
          return callback(err);
        }

        invitation.used = true;
        invitation.save(function (err) {
          // TODO: handle error
          console.log(err);
        });

        callback(null);
      });
  });
};
