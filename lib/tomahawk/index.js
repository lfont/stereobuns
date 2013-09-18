/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var _          = require('underscore'),
    runtime    = require('./runtime'),
    Observable = require('../observable');

function Tomahawk (app, resolverNames) {
  var resolvers = [];

  _.extend(this, new Observable()); // TODO: replace by node EventEmitter

  function loadResolverData (name) {
    var resolversPath = __dirname + '/resolvers/' + name + '/',
        metadata      = require(resolversPath + 'metadata.json');

    return {
      name: metadata.name,
      main: resolversPath + metadata.manifest.main,
      icon: resolversPath + metadata.manifest.icon
    };
  }

  function registerResolberModule (data) {
    var module = require(data.main);

    if (module.init) {
      module.init();
    }

    resolvers.push(module);
  }

  function registerResolverRoutes (data) {
    // register a route for retrieving the resolver's icon.
    app.get('/tomahawk/resolvers/' + data.name + '/icon.png',
            function (req, res) {
              res.sendfile(data.icon);
            });
  }

  this.getResolvers = function () {
    return resolvers;
  };

  // initialization
  (function () {
    var i, len, resolverData;

    for (i = 0, len = resolverNames.length; i < len; i++) {
      resolverData = loadResolverData(resolverNames[i]);
      registerResolberModule(resolverData);
      registerResolverRoutes(resolverData);
    }
  }());
}

Tomahawk.prototype.search = function (qid, searchString) {
  var _this = this,
      resolvers = this.getResolvers(),
      resultsCount = 0,
      emptyResult = { qid: qid, tracks: [] },
      results = [];

  function onTrackResults (result) {
    if (result.qid !== qid) {
      return;
    }

    if (resultsCount < resolvers.length) {
      _this.trigger('trackResults', result);
    }

    if (++resultsCount === resolvers.length) {
      runtime.off('trackResults:' + qid, onTrackResults);
    }
  }

  runtime.on('trackResults:' + qid, onTrackResults);

  resolvers.forEach(function (resolver) {
    resolver.search(qid,
                    encodeURIComponent(searchString.replace('"', '')
                                                   .replace("'", '')));

    setTimeout(onTrackResults.bind(_this, emptyResult),
               resolver.settings.timeout * 1000);
  });
};

exports.configure = function (app, resolverNames) {
  return new Tomahawk(app, resolverNames);
};
