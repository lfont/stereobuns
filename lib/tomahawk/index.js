/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var socketio = require('socket.io'),
    Engine   = require('./engine'),
    config   = require('../configuration');

exports.listen = function (server, app) {
  var io     = socketio.listen(server),
      engine = new Engine(config.searchServices, app);

  function getQid (socket, clientQid) {
    return socket.id + ':' + clientQid;
  }

  function getClientQid (socket, qid) {
    return qid.replace(new RegExp('^' + socket.id + ':'), '');
  }

  function handleSearchQuery (socket) {
    socket.on('searchQuery', function (clientQid, searchString) {
      var qid = getQid(socket, clientQid);
      engine.search(qid, searchString);
    });
  }

  function handleSearchResult (socket) {
    engine.on('searchResult', function (result) {
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
    // FIXME: crash with node 0.10
    //io.enable('browser client gzip');

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
