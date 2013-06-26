/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var http         = require('http'),
    app          = require('./app'),
    searchServer = require('./lib/search-server');

var server = http.createServer(app);

searchServer.listen(server);

server.listen(process.env.PORT || 3000, function () {
    app.set('port', server.address().port);
    console.log('Express server listening on port %d in %s mode',
                app.get('port'), app.settings.env);
});
