/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery',
    './observable'
], function ($, Observable) {
    'use strict';
    
    function TomahawkRuntime () {
        var resolvers = [];
        
        $.extend(this, new Observable());
        
        this.resolver = {};
        
        Object.defineProperty(this.resolver, 'instance', {
            get: function () {
                return resolvers;
            },
            
            set: function (value) {
                resolvers.push(value);
            }
        });
        
        this.addTrackResults = function (result) {
            this.trigger('trackResults', result);
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
