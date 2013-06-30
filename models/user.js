/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ email: 'string', name: 'string', picture: 'string' }),
    User       = mongoose.model('User', userSchema);

exports.create = function (user, callback) {
    User.create(user, function (err, newUser) {
        if (err) {
            // TODO: handle error
            console.log(err);
        }
        callback(err, newUser);
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
