/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function userMdlFactory ($q, $http) {
        
        return {
            getUser: function () {
                var deferred = $q.defer();
                $http
                    .get('/api/users/me', { cache: true })
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            }
        };
    }
    
    userMdlFactory.$inject = [ '$q', '$http' ];
    
    return userMdlFactory;
});
