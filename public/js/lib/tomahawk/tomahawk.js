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
        var expectedResolversCount = resolverNames.length,
            onReadyCallbacks = [],
            ready = false;
        
        function onLoadScriptError (error) {
            window.Tomahawk.log('The script ' + error.target.src + ' is not accessible.');
        }
        
        function loadScript (src, callback) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;
            script.onload = callback;
            script.onerror = onLoadScriptError;
            var firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(script, firstScript);
        }
        
        function onLoadResolver () {
            var len = window.Tomahawk.resolver.instance.length,
                i;
            
            if (expectedResolversCount === len) {
                for (i = 0; i < len; i++) {
                    if (window.Tomahawk.resolver.instance[i].init) {
                        window.Tomahawk.resolver.instance[i].init();
                    }
                }
                ready = true;
                for (i = 0, len = onReadyCallbacks.length; i < len; i++) {
                    onReadyCallbacks[i]();
                }
                onReadyCallbacks.length = 0;
            }
        }
        
        function onLoadResolverError (name) {
            window.Tomahawk.log('The resolver ' + name + ' is not accessible.');
            expectedResolversCount--;
            onLoadResolver();
        }
        
        function loadResolver (name) {
            var resolversPath = '/js/lib/tomahawk/resolvers/' + name + '/content/',
                promise = $.getJSON(resolversPath + 'metadata.json');
            
            promise.done(function (data, textStatus, jqXHR) {
                loadScript(resolversPath + data.manifest.main, onLoadResolver);
            });
            
            promise.fail(function (jqXHR, textStatus, errorThrown) {
                onLoadResolverError(name);
            });
        }
        
        this.onReady = function (callback) {
            if (ready) {
                callback();
                return;
            }
            onReadyCallbacks.push(callback);
        };
        
        // initialization
        (function () {
            var i, len;
        
            for (i = 0, len = resolverNames.length; i < len; i++) {
                loadResolver(resolverNames[i]);
            }
        }());
    }
    
    Tomahawk.prototype.search = function (searchString) {
        var deferred = $.Deferred(),
            qid = Date.now(),
            results = [],
            resolversCount = window.Tomahawk.resolver.instance.length,
            resultsCount = 0;
        
        function onTrackResults (result) {
            if (result.qid !== qid) {
                return;
            }
            
            results = results.concat(result.results);
            resultsCount++;
            if (resultsCount === resolversCount) {
                window.Tomahawk.offTrackResults(onTrackResults);
                deferred.resolve(results);
            }
        }
        
        this.onReady(function () {
            var emptyResult = {
                    qid: qid,
                    results: []
                },
                i, resolver;
            
            window.Tomahawk.onTrackResults(onTrackResults);
            
            for (i = 0; i < resolversCount; i++) {
                resolver = window.Tomahawk.resolver.instance[i];
                try {
                    resolver.search(qid, searchString);
                } catch (e) {
                    window.Tomahawk.log('Search failed with resolver: ' +
                                        resolver.settings.name +
                                        '.Error: ' +
                                        e.message);
                    onTrackResults(emptyResult);
                }
                // TODO: cancle the timeout on success.
                setTimeout(onTrackResults.bind(this, emptyResult),
                    resolver.settings.timeout * 1000);
            }
        });
        
        return deferred.promise();
    };
    
    window.Tomahawk = new TomahawkRuntime();
    window.TomahawkResolver = new TomahawkResolver();
    return Tomahawk;
});
