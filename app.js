/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var express = require('express'),
    routes  = require('./routes');

var app = module.exports = express();


// configuration

app.configure(function () {
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    
    app.use(express.favicon());
    app.use(app.router);
    
    app.enable('verbose errors');
});

app.configure('development', function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.static(__dirname + '/public-build'));
    app.use(express.errorHandler());
    
    app.disable('verbose errors');
});


// custom mime

express.static.mime.define({ 'application/x-web-app-manifest+json': [ 'webapp' ] });
express.static.mime.define({ 'text/cache-manifest': [ 'appcache' ] });


// error handler

app.use(function (err, req, res, next) {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('500', { error: err });
});


// routes

app.use(function (req, res) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

routes.register(app);
