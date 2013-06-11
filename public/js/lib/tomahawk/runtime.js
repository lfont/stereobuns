/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery'
], function ($) {
    'use strict';
    
    function TomahawkRuntime () {
        var resolvers = [],
            onTrackResultsCallbacks = [];
        
        this.resolver = {};
        
        Object.defineProperty(this.resolver, 'instance', {
            get: function () {
                return resolvers;
            },
            
            set: function (value) {
                resolvers.push(value);
            }
        });
        
        this.onTrackResults = function (callback) {
            onTrackResultsCallbacks.push(callback);
        };
        
        this.offTrackResults = function (callback) {
            var index = onTrackResultsCallbacks.indexOf(callback);
            onTrackResultsCallbacks.splice(index, 1);
        };
        
        this.addTrackResults = function (result) {
            var i, len;
            
            for (i = 0, len = onTrackResultsCallbacks.length; i < len; i++) {
                onTrackResultsCallbacks[i](result);
            }
        };
    }
    
    TomahawkRuntime.prototype.extend = function (source, target) {
        return $.extend(target, source);
    };
    
    TomahawkRuntime.prototype.log = function (message) {
        console.log(message);
    };
    
    TomahawkRuntime.prototype.readBase64 = function (data) {
        throw new Error('not implemented');
    };
    
    TomahawkRuntime.prototype.asyncRequest = function (query, callback) {
        var promise = $.get(query);
        promise.done(function (data, textStatus, jqXHR) {
            callback(jqXHR);
        });
        promise.fail(function (jqXHR, textStatus, errorThrown) {
            callback(jqXHR);
        });
    };
    
    return TomahawkRuntime;
});
