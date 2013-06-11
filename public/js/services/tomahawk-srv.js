/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'lib/tomahawk'
], function (Tomahawk) {
    'use strict';
    
    function TomahawkSrvFactory ($q, $rootScope) {
        var tomahawk = new Tomahawk([
            'soundcloud',
            'exfm'
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
                    $rootScope.$apply();
                });
                promise.fail(function (error) {
                    deferred.reject(error);
                    $rootScope.$apply();
                });
                
                return deferred.promise;
            }
        };
    }
    
    TomahawkSrvFactory.$inject = [ '$q', '$rootScope' ];
    
    return TomahawkSrvFactory;
});
