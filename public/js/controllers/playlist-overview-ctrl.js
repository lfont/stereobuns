/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function OverviewCtrl ($scope, $rootScope) {
        $scope.name = '';
        $scope.length = 0;
        
        $scope.isVisible = function () {
            return $scope.name !== '';
        };
        
        $scope.$on('playlist', function (event, playlist) {
            $scope.name = playlist.name;
            $scope.length = playlist.songs.length;
        });
    }
    
    OverviewCtrl.$inject = [ '$scope', '$rootScope' ];
    
    return OverviewCtrl;
});
