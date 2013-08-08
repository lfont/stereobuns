/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var http     = require('http'),
    app      = require('./app'),
    tomahawk = require('./lib/tomahawk'),
    config   = require('./lib/configuration');

var server = http.createServer(app);

tomahawk.listen(server, app);

server.listen(config.serverPort, function () {
  console.log('Express server listening on port %d in %s mode',
              config.serverPort, app.settings.env);
});
