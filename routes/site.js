/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

exports.signin = function (req, res) {
    if (req.signedCookies.user) {
        res.redirect('/home');
    } else {
        res.render('signin');
    }
};
