/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistSrv ($http, $window) {

    this.getPlaylists = function (user) {
      return $http
        .get('/api/users/' + user + '/playlists')
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('get playlists failed!');
        })
        .then(function (response) {
          return response.data;
        });
    };

    this.createPlaylist = function (name) {
      return $http
        .post('/api/users/me/playlists', { name: name })
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + name + ' has not been created');
        })
        .then(function (response) {
          if (response.data.count !== 0) {
            $window.console.log('playlist: ' + name + ' has been created');
            return true;
          }
          return false;
        });
    };

    this.deletePlaylist = function (name) {
      return $http
        .delete('/api/users/me/playlists/' + name)
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + name + ' has not been removed');
        })
        .then(function (response) {
          if (response.data.count !== 0) {
            $window.console.log('playlist: ' + name + ' has been removed');
            return true;
          }
          return false;
        });
    };
    
    this.getPlaylistTracks = function (user, playlist) {
      return $http
        .get('/api/users/' + user + '/playlists/' + playlist)
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('get tracks failed for playlist: ' + playlist);
        })
        .then(function (response) {
          return response.data.songs;
        });
    };
      
    this.addToPlaylist = function (playlist, track) {
      return $http
        .post('/api/users/me/playlists/' + playlist + '/songs', track)
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('track: ' + track.url + ' has not been added.');
        })
        .then(function (response) {
          if (response.data.count !== 0) {
            $window.console.log('track: ' + track.url + ' has been added.');
            return track;
          }
          return null;
        });
    };

    this.removeFromPlaylist = function (playlist, track) {
      return $http
        .delete('/api/users/me/playlists/' + playlist + '/songs/' + track._id)
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('track: ' + track.url + ' has not been removed.');
        })
        .then(function (response) {
          if (response.data.count !== 0) {
            $window.console.log('track: ' + track.url + ' has been removed.');
            return track;
          }
          return null;
        });
    };
  }

  PlaylistSrv.$inject = [ '$http', '$window' ];

  return PlaylistSrv;
});
