/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var everyauth = require('everyauth');

var usersById = {};
var nextUserId = 0;
var usersByTwitId = {};

function addUser (source, sourceUser) {
    var user;
    if (arguments.length === 1) { // password-based
        user = sourceUser = source;
        user.id = ++nextUserId;
        usersById[nextUserId] = user;
    } else { // non-password-based
        user = usersById[++nextUserId] = { id: nextUserId };
        user[source] = sourceUser;
    }
    return user;
}

exports.configure = function (app) {
    app.use(everyauth.middleware());

    if (app.settings.env === 'development') {
        everyauth.debug = true;
    }
    
    everyauth
        .everymodule
        .findUserById( function (userId, callback) {
            callback(null, usersById[userId]);
        });
    
    everyauth
        .twitter
        .consumerKey('t2hUIWUwIuHAlpIKVTTQ')
        .consumerSecret('w32BqZWsI4DV5aavEcMjW58xzkbjuEu0bzQKB4Go')
        .findOrCreateUser(function (sess, accessToken, accessSecret, twitUser) {
            return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
        })
        .redirectPath('/');
};
