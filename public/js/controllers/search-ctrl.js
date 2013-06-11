/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope, $rootScope, tomahawkSrv) {
        $scope.query = '';
        
        $scope.search = function ($event) {
            var promise = tomahawkSrv.search($scope.query);
            promise.then(function (result) {
                $rootScope.$broadcast('playqueue:search', result);
            }, function (error) {
                $rootScope.$broadcast('error', error);
            });
        };
    }
    
    SearchCtrl.$inject = [ '$scope', '$rootScope', 'tomahawkSrv' ];
    
    return SearchCtrl;
});
