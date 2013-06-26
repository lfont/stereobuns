/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Observable = require('./observable'),
    _          = require('underscore'),
    http       = require('http');

function TomahawkRuntime () {
    var resolvers = [];
    
    _.extend(this, new Observable());
    
    this.resolver = {};
    
    Object.defineProperty(this.resolver, 'instance', {
        get: function () {
            return resolvers;
        },
        
        set: function (value) {
            resolvers.push(value);
        }
    });
}

TomahawkRuntime.prototype.addTrackResults = function (result) {
    this.trigger('trackResults', result);
};

TomahawkRuntime.prototype.extend = function (source, target) {
    return _.extend(target, source);
};

TomahawkRuntime.prototype.log = function (message) {
    console.log(message);
};

TomahawkRuntime.prototype.readBase64 = function (data) {
    throw new Error('not implemented');
};

TomahawkRuntime.prototype.valueForSubNode = function (node, subNode) {
    throw new Error('not implemented');
};

TomahawkRuntime.prototype.asyncRequest = function (query, callback) {
    var _this = this;
    
    http.get(query, function (res) {
        var data = '';
        
        res.on('data', function (chunk) {
            data += chunk;
        });
        
        res.on('end', function () {
            // TODO: handle xml response
            var json = JSON.parse(data);
            callback(json);
        });
    }).on('error', function (e) {
        _this.log("Got error: " + e.message);
    });
};

module.exports = new TomahawkRuntime();
