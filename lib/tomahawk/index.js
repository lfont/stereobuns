/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var runtime    = require('./runtime'),
    Observable = require('./observable'),
    _          = require('underscore');
    
function Tomahawk (resolverNames) {
    _.extend(this, new Observable());
    
    function loadResolver (name) {
        var resolversPath = './resolvers/' + name + '/content/',
            metadata      = require(resolversPath + 'metadata.json');
        
        require(resolversPath + metadata.manifest.main);
        
        return runtime.resolver.instance[runtime.resolver.instance.length - 1];
    }
    
    // initialization
    (function () {
        var i, len, resolver;
    
        for (i = 0, len = resolverNames.length; i < len; i++) {
            resolver = loadResolver(resolverNames[i]);
            if (resolver.init) {
                resolver.init();
            }
        }
    }());
}
    
Tomahawk.prototype.search = function (searchString) {
    var _this = this,
        qid = Date.now(),
        resultsCount = 0,
        resolversCount = runtime.resolver.instance.length,
        emptyResult = {
            qid: qid,
            results: []
        },
        i, resolver;
    
    function onTrackResults (result) {
        if (result.qid !== qid) {
            return;
        }
        
        if (++resultsCount === resolversCount) {
            runtime.off('trackResults', onTrackResults);
        }
        
        if (resultsCount <= resolversCount) {
            _this.trigger('searchResult', result);
        }
    }

    runtime.on('trackResults', onTrackResults);
    
    for (i = 0; i < resolversCount; i++) {
        resolver = runtime.resolver.instance[i];
        
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
