/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var socketio = require('socket.io'),
    Tomahawk = require('./tomahawk');

exports.listen = function (server) {
    var io       = socketio.listen(server),
        tomahawk = new Tomahawk([
            'soundcloud',
            'exfm',
            'official.fm'
            //'youtube',
            //'jamendo'
        ]);

    function handleSearch (socket) {
        socket.on('search', function (searchString) {
            var qid = tomahawk.search(searchString);
            socket.emit('searchQuery', qid);
        });
    }
    
    function handleSearchResult (socket) {
        tomahawk.on('searchResult', function (result) {
            socket.emit('searchResult', result);
        });
    }
    
    io.configure('production', function () {
        io.enable('browser client minification');
        io.enable('browser client etag');
        io.enable('browser client gzip');
        
        io.set('log level', 1);

        // Heroku does not support WebSocket.
        io.set('transports', [ 'xhr-polling' ]);
        io.set('polling duration', 10);
    });
    
    io.sockets
      .on('connection', function (socket) {
        handleSearch(socket);
        handleSearchResult(socket);
    });
};
