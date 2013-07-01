/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function userSrvFactory ($q, $http) {
        
        return {
            getUser: function () {
                var deferred = $q.defer();
                $http
                    .get('/api/user/me', { cache: true })
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
    
    userSrvFactory.$inject = [ '$q', '$http' ];
    
    return userSrvFactory;
});
