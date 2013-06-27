/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var runtime    = require('./runtime'),
    Observable = require('./observable'),
    _          = require('underscore');

function Tomahawk (resolverNames) {
    var resolvers = [];
    
    _.extend(this, new Observable());
    
    function loadResolver (name) {
        var resolversPath = './resolvers/' + name + '/content/',
            metadata      = require(resolversPath + 'metadata.json'),
            resolver      = require(resolversPath + metadata.manifest.main);
        
        return resolver;
    }
    
    this.getResolvers = function () {
        return resolvers;
    };
    
    // initialization
    (function () {
        var i, len, resolver;
    
        for (i = 0, len = resolverNames.length; i < len; i++) {
            resolver = loadResolver(resolverNames[i]);
            if (resolver.init) {
                resolver.init();
            }
            resolvers.push(resolver);
        }
    }());
}
    
Tomahawk.prototype.search = function (qid, searchString) {
    var _this = this,
        resolvers = this.getResolvers(),
        resultsCount = 0,
        emptyResult = {
            qid: qid,
            results: []
        },
        i, len, resolver;
    
    function onTrackResults (result) {
        if (result.qid !== qid) {
            return;
        }
        
        if (++resultsCount === resolvers.length) {
            runtime.off('trackResults:' + qid, onTrackResults);
        }
        
        if (resultsCount <= resolvers.length) {
            _this.trigger('searchResult', result);
        }
    }

    runtime.on('trackResults:' + qid, onTrackResults);
    
    for (i = 0, len = resolvers.length; i < len; i++) {
        resolver = resolvers[i];
        
        try {
            resolver.search(qid, searchString);
            setTimeout(onTrackResults.bind(this, emptyResult),
                       resolver.settings.timeout * 1000);
        } catch (e) {
            runtime.log('Search failed with resolver: ' +
                                resolver.settings.name +
                                '.Error: ' +
                                e.message);
            onTrackResults(emptyResult);
        }
    }
    
    return qid;
};

module.exports = Tomahawk;
