/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function (angular) {
    'use strict';

    function UserMenuCtrl ($scope, userMdl) {
        var promise;
        
        $scope.user = null;
        
        promise = userMdl.getUser();
        promise.then(function (user) {
            $scope.user = user;
        }, function (error) {
            // TODO: handle error            
        });
    }
    
    UserMenuCtrl.$inject = [ '$scope', 'userMdl' ];
    
    return UserMenuCtrl;
});
