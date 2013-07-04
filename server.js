/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var http         = require('http'),
    app          = require('./app'),
    searchServer = require('./lib/search-server'),
    config       = require('./lib/configuration');

var server = http.createServer(app);

searchServer.listen(server);

server.listen(config.serverPort, function () {
    console.log('Express server listening on port %d in %s mode',
                config.serverPort, app.settings.env);
});
