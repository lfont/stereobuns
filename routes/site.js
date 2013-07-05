/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var config = require('../lib/configuration');

exports.index = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.render('site/index', {
            title: 'Welcome',
            trackingCode: config.googleAnalyticsTrackingCode
        });
    }
};
