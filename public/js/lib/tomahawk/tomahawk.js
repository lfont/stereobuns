/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery',
    './runtime',
    './resolver'
], function ($, TomahawkRuntime, TomahawkResolver) {
    'use strict';
    
    function Tomahawk (resolverNames) {
        function onLoadResolverError (error) {
            window.Tomahawk.log('The resolver ' + error.target.src + ' is not accessible.');
        }
        
        function loadResolver (name, callback) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            
            // TODO : the script path should be read from the metadata file.
            script.src = '/js/lib/tomahawk/resolvers/' + name + '/content/contents/code/' + name + '.js';
            script.onload = callback;
            script.onerror = onLoadResolverError;
            var firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(script, firstScript);
        }
        
        this.onReady = function (callback) {
            var i, len;
            
            function onResolverLoaded () {
                var len = window.Tomahawk.resolver.instance.length,
                    i;
                
                if (len === resolverNames.length) {
                    for (i = 0; i < len; i++) {
                        window.Tomahawk.resolver.instance[i].init();
                    }
                    callback();
                    return true;
                }
            }
            
            if (onResolverLoaded()) {
                return;
            }
            
            for (i = 0, len = resolverNames.length; i < len; i++) {
                loadResolver(resolverNames[i], onResolverLoaded);
            }
        };
    }
    
    Tomahawk.prototype.search = function (searchString) {
        var deferred = $.Deferred(),
            qid = Date.now,
            results = [],
            resultCount = 0;
        
        function onTrackResults (result) {
            if (result.qid !== qid) {
                return;
            }
            
            results = results.concat(result.results);
            resultCount++;
            if (resultCount === window.Tomahawk.resolver.instance.length) {
                window.Tomahawk.offTrackResults(onTrackResults);
                deferred.resolve(results);
            }
        }
        
        this.onReady(function () {
            var i, len;
            
            for (i = 0, len = window.Tomahawk.resolver.instance.length; i < len; i++) {
                window.Tomahawk.resolver.instance[i].search(qid, searchString);
            }
            
            window.Tomahawk.onTrackResults(onTrackResults);
        });
        
        return deferred.promise();
    };
    
    window.Tomahawk = new TomahawkRuntime();
    window.TomahawkResolver = new TomahawkResolver();
    return Tomahawk;
});
