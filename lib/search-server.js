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
            'official.fm',
            'youtube',
            'jamendo'
        ]);
    
    function getQid (socket, clientQid) {
        return socket.id + ':' + clientQid;
    }
    
    function getClientQid (socket, qid) {
        return qid.replace(new RegExp('^' + socket.id + ':'), '');
    }

    function handleSearchQuery (socket) {
        socket.on('searchQuery', function (clientQid, searchString) {
            var qid = getQid(socket, clientQid);
            tomahawk.search(qid, searchString);
        });
    }
    
    function handleSearchResult (socket) {
        tomahawk.on('searchResult', function (result) {
            var clientId = getClientQid(socket, result.qid);
            result.qid = clientId;
            socket.emit('searchResult', result);
        });
    }
    
    io.configure('development', function () {
        io.set('log level', 2);
    });
    
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
        handleSearchQuery(socket);
        handleSearchResult(socket);
    });
};
