/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'lib/tomahawk'
], function (Tomahawk) {
    'use strict';
    
    function TomahawkSrvFactory ($q) {
        var tomahawk = new Tomahawk([
            'soundcloud'
        ]);
        
        return {
            search: function (searchString) {
                var deferred = $q.defer();
                
                var promise = tomahawk.search(searchString);
                promise.done(function (results) {
                    var result = {
                        searchString: searchString,
                        songs: results
                    };
                    deferred.resolve(result);
                });
                promise.fail(function (error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            }
        };
    }
    
    TomahawkSrvFactory.$inject = [ '$q' ];
    
    return TomahawkSrvFactory;
});
