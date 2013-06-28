/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

exports.index = function (req, res) {
    if (req.user) {
        res.render('index');
    } else if (req.route.path === '/') {
        res.render('signin');
    } else {
        res.redirect('/');
    }
};
