/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var User = require('./models').User;

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
