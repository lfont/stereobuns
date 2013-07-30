/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var config = require('../lib/configuration');

exports.index = function (req, res) {
  res.render('site/index', {
    title: 'Welcome',
    trackingCode: config.googleAnalyticsTrackingCode
  });
};
