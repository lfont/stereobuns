/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var site = require('./site'),
    user = require('./user');

function restrict (req, res, next) {
    if (req.signedCookies.user) {
        next();
        return;
    }
    
    if (req.user) {
        res.cookie('user', {
            email: 'foo',
            name: 'bar',
            avatar: 'http://my.avatar.com'
        }, {
            signed: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
        next();
        return;
    }

    res.redirect('/');
}

exports.register = function (app) {
    app.get('/', site.signin);
    app.get('/home', restrict, user.home);
    app.get('/search', restrict, user.home);
    app.get('/playlist/:name', restrict, user.home);
};
