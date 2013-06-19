/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchBarCtrl ($scope, $rootScope, soundSearchSrv) {
        $scope.query = '';
        
        $scope.search = function ($event) {
            var promise = soundSearchSrv.search($scope.query);
            promise.then(function (playlist) {
                $rootScope.$broadcast('playlist', playlist);
                $scope.query = '';
            }, function (error) {
                $rootScope.$broadcast('error', error);
                $scope.query = '';
            });
        };
    }
    
    SearchBarCtrl.$inject = [ '$scope', '$rootScope', 'soundSearchSrv' ];
    
    return SearchBarCtrl;
});
