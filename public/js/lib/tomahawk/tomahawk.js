/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery',
    './runtime',
    './resolver',
    './observable'
], function ($, TomahawkRuntime, TomahawkResolver, Observable) {
    'use strict';
    
    var tomahawkRuntime;
    
    window.Tomahawk = tomahawkRuntime = new TomahawkRuntime();
    window.TomahawkResolver = new TomahawkResolver();
    
    function Tomahawk (resolverNames) {
        var expectedResolversCount = resolverNames.length,
            onReadyCallbacks = [],
            ready = false;
        
        $.extend(this, new Observable());
        
        function onLoadScriptError (error) {
            tomahawkRuntime.log('The script ' + error.target.src + ' is not accessible.');
        }
        
        function loadScript (src, callback) {
            var firstScript = document.getElementsByTagName('script')[0],
                script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;
            script.onload = callback;
            script.onerror = onLoadScriptError;
            firstScript.parentNode.insertBefore(script, firstScript);
        }
        
        function onLoadResolver () {
            var len = tomahawkRuntime.resolver.instance.length,
                i;
            
            if (expectedResolversCount === len) {
                for (i = 0; i < len; i++) {
                    if (tomahawkRuntime.resolver.instance[i].init) {
                        tomahawkRuntime.resolver.instance[i].init();
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
            tomahawkRuntime.log('The resolver ' + name + ' is not accessible.');
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
        var _this = this,
            qid = Date.now(),
            resultsCount = 0,
            resolversCount;
        
        function onTrackResults (result) {
            if (result.qid !== qid) {
                return;
            }
            
            if (++resultsCount === resolversCount) {
                tomahawkRuntime.off('trackResults', onTrackResults);
            }
            
            if (resultsCount <= resolversCount) {
                _this.trigger('searchResult', result);
            }
        }
        
        this.onReady(function () {
            var emptyResult = {
                    qid: qid,
                    results: []
                },
                i, resolver;
            
            // It's safe to retrieve the number of resolvers here.
            resolversCount = tomahawkRuntime.resolver.instance.length;
            tomahawkRuntime.on('trackResults', onTrackResults);
            
            for (i = 0; i < resolversCount; i++) {
                resolver = tomahawkRuntime.resolver.instance[i];
                
                try {
                    resolver.search(qid, searchString);
                    setTimeout(onTrackResults.bind(this, emptyResult),
                               resolver.settings.timeout * 1000);
                } catch (e) {
                    tomahawkRuntime.log('Search failed with resolver: ' +
                                        resolver.settings.name +
                                        '.Error: ' +
                                        e.message);
                    onTrackResults(emptyResult);
                }
            }
        });
        
        return qid;
    };
    
    return Tomahawk;
});
