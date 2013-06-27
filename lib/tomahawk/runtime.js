/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var Observable = require('./observable'),
    _          = require('underscore'),
    http       = require('http');

function getContentType (headers) {
    var contentType = headers['content-type'];
    if (contentType) {
        contentType = contentType.replace(/;.*$/, '');
    }
    return contentType;
}

function TomahawkRuntime () {
    _.extend(this, new Observable());
}

TomahawkRuntime.prototype.addTrackResults = function (result) {
    this.trigger('trackResults:' + result.qid, result);
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

TomahawkRuntime.prototype.asyncRequest = function (query, callback) {
    var _this = this;
    
    http.get(query, function (res) {
        var contentType = getContentType(res.headers),
            data = '';
        
        res.on('data', function (chunk) {
            data += chunk;
        });
        
        res.on('end', function () {
            var result;
            switch (contentType) {
            case 'application/json':
                result = JSON.parse(data);
                break;
            default:
                result = data;
            }
            callback(result);
        });
    }).on('error', function (e) {
        _this.log("Got error: " + e.message);
    });
};

module.exports = new TomahawkRuntime();
