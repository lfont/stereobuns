/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SearchCtrl ($scope, tomahawkSrv) {
        $scope.query = '';
        
        $scope.search = function ($event) {
            var promise = tomahawkSrv.search($scope.query);
            promise.then(function (result) {
                $scope.$emit('playqueue:search', result);
            }, function (error) {
                $scope.$emit('error', error);
            });
        };
    }
    
    SearchCtrl.$inject = [ '$scope', 'tomahawkSrv' ];
    
    return SearchCtrl;
});
