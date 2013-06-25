/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function Observable () {
        var observables = {};
        
        this.on = function (eventName, callback) {
            if (!observables[eventName]) {
                observables[eventName] = [];
            }
            observables[eventName].push(callback);
        };

        this.off = function (eventName, callback) {
            if (!observables[eventName]) {
                return;
            }
            if (!callback) {
                observables[eventName].length = 0;
                return;
            }
            var index = observables[eventName].indexOf(callback);
            observables[eventName].splice(index, 1);
        };

        this.trigger = function (eventName) {
            var handlers = observables[eventName],
                args, i, len, handler;
            
            if (!handlers) {
                return;
            }
            
            // we make a copy of the handlers array
            // because it can be altered if off() or
            // on() is called from an handler.
            handlers = handlers.slice(0);
            args = Array.prototype.slice.call(arguments, 1);
            for (i = 0, len = handlers.length; i < len; i++) {
                handler = handlers[i];
                if (handler) {
                    handler.apply(this, args);
                }
            }
        };
    }
    
    return Observable;
});
