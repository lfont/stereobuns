/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope, $rootScope, soundSearchSrv) {
        $scope.query = '';
        
        $scope.search = function ($event) {
            var promise = soundSearchSrv.search($scope.query);
            promise.then(function (playlist) {
                $rootScope.$broadcast('playlist', playlist);
            }, function (error) {
                $rootScope.$broadcast('error', error);
            });
        };
    }
    
    SearchCtrl.$inject = [ '$scope', '$rootScope', 'soundSearchSrv' ];
    
    return SearchCtrl;
});
