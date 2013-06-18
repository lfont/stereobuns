/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function SongBarDrtFactory () {
        
        return {
            restrict: 'E',
            replace: true,
            scope: false,
            templateUrl: 'song-bar-drt.html',
            controller: [ '$scope', 'audioPlayerSrv', function ($scope, audioPlayerSrv) {
                this.songs = [];
                
                // TODO: get the playlist list
                $scope.playlists = [
                    { name: 'playlist 1' },
                    { name: 'playlist 2' }
                ];
                
                $scope.play = function () {
                    console.log('TODO: play()');
                };
                
                $scope.add = function () {
                    console.log('TODO: add()');
                };
                
                $scope.addToPlaylist = function (playlist) {
                    console.log('TODO: addToPlaylist() ' + playlist.name);
                };
            }],
            
            link: function (scope, iElement, iAttrs, controller) {
                iAttrs.$observe('songs', function (value) {
                    controller.songs = value;
                });
            }
        };
    }
    
    SongBarDrtFactory.$inject = [];
    
    return SongBarDrtFactory;
});
