/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';

    function SongProgressDrtCtrl ($scope, audioPlayerSrv) {
        var loadingPercentage, playingPercentage;
        
        function setProgressStatus () {
            $scope.stackedStatus[0].value = playingPercentage;
            $scope.stackedStatus[1].value = loadingPercentage - playingPercentage;
        }
        
        $scope.position = 0;
        $scope.duration = 0;
        $scope.stackedStatus = [
            { value: 0, type: 'success' }, // playing
            { value: 0, type: 'info' } // loading
        ];
        
        $scope.$on('audioPlayer:stop', function (event) {
            $scope.position = 0;
            $scope.duration = 0;
            $scope.stackedStatus[0].value = 0;
            $scope.stackedStatus[1].value = 0;
        });
        
        $scope.$on('audioPlayer:loading', function (event, percentage) {
            loadingPercentage = percentage;
            setProgressStatus();
        });
        
        $scope.$on('audioPlayer:playing', function (event, status) {
            $scope.duration = status.duration;
            $scope.position = status.position;
            playingPercentage = Math.floor($scope.position * 100 / $scope.duration);
            setProgressStatus();
        });
    }
     
    SongProgressDrtCtrl.$inject = [ '$scope', 'audioPlayerSrv' ];
    
    return SongProgressDrtCtrl;
});
