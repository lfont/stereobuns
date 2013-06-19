/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function SongBarDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'song-bar-drt.html',
            controller: [
                '$scope',
                '$window',
                'audioPlayerSrv',
                function ($scope, $window, audioPlayerSrv) {
                    var DEFAULT_OPTIONS = {
                        remove: false,
                        play: true,
                        add: true,
                        playlists: true
                    };
                    
                    this.songs = [];
                    
                    this.setOptions = function (options) {
                        var opts = angular.extend({}, DEFAULT_OPTIONS, options);
                        $scope.options = opts;
                    };
                    
                    $scope.selectedSongs = [];
                    
                    // TODO: get the playlist list
                    $scope.playlists = [
                        { name: 'playlist 1' },
                        { name: 'playlist 2' }
                    ];
                    
                    $scope.clearSelection = function () {
                        $scope.selectedSongs.length = 0;
                    };
                    
                    $scope.clearQueue = function () {
                        audioPlayerSrv.clearQueue();
                        $scope.clearSelection();
                    };
                    
                    $scope.play = function () {
                        if ($scope.selectedSongs.length) {
                            audioPlayerSrv.enqueue($scope.selectedSongs);
                            audioPlayerSrv.play($scope.selectedSongs[0]);
                        } else {
                            audioPlayerSrv.enqueue(this.songs);
                            audioPlayerSrv.play(this.songs[0]);
                        }
                        $scope.clearSelection();
                    };
                    
                    $scope.add = function () {
                        if ($scope.selectedSongs.length) {
                            audioPlayerSrv.enqueue($scope.selectedSongs);
                        } else {
                            audioPlayerSrv.enqueue(this.songs);
                        }
                        $scope.clearSelection();
                    };
                    
                    $scope.addToPlaylist = function (playlist) {
                        $window.alert('TODO: addToPlaylist(' + playlist.name + ')');
                    };
                    
                    this.setOptions();
                }
            ],
            
            link: function (scope, iElement, iAttrs, controller) {
                iAttrs.$observe('allSongs', function (value) {
                    controller.songs = scope.$parent.$eval(value);
                });
                
                iAttrs.$observe('selectedSongs', function (value) {
                    scope.selectedSongs = scope.$parent.$eval(value);
                });
                
                iAttrs.$observe('options', function (value) {
                    controller.setOptions(scope.$parent.$eval(value));
                });
            }
        };
    }
    
    SongBarDrtFactory.$inject = [];
    
    return SongBarDrtFactory;
});
