/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var config = require('../lib/configuration');

exports.home = function (req, res) {
    res.render('user/home', {
        title: req.user.name,
        trackingCode: config.googleAnalyticsTrackingCode
    });
};
