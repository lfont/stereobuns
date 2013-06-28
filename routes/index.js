/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var site = require('./site');

exports.register = function (app) {
    app.get('/', site.index);
    app.get('/search', site.index);
    app.get('/playlist/:name', site.index);
};
