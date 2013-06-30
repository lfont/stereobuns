/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.render('signin');
    }
};
