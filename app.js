/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var express = require('express');

var app = module.exports = express();

// Configuration

app.configure(function () {
    app.use(express.favicon());
});

app.configure('development', function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.static(__dirname + '/public-build'));
    app.use(express.errorHandler());
});

express.static.mime.define({ 'application/x-web-app-manifest+json': [ 'webapp' ] });
express.static.mime.define({ 'text/cache-manifest': [ 'appcache' ] });
