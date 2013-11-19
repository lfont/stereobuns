/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function PlaylistSrv ($http, $window) {

    this.getPlaylists = function (userNickname) {
      return $http
        .get('/api/users/' + userNickname + '/playlists')
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('get playlists failed!');
        })
        .then(function (response) {
          return response.data;
        });
    };

    this.createPlaylist = function (playlistName) {
      return $http
        .post('/api/users/me/playlists', { name: playlistName })
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + playlistName + ' has not been created');
        })
        .then(function (response) {
          if (response.data.count !== 0) {
            $window.console.log('playlist: ' + playlistName + ' has been created');
            return true;
          }
          return false;
        });
    };

    this.deletePlaylist = function (playlistName) {
      return $http
        .delete('/api/users/me/playlists/' + encodeURIComponent(playlistName))
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('playlist: ' + playlistName + ' has not been removed');
        })
        .then(function (response) {
          if (response.data.count !== 0) {
            $window.console.log('playlist: ' + playlistName + ' has been removed');
            return true;
          }
          return false;
        });
    };
    
    this.getPlaylistTracks = function (userNickname, playlistName) {
      return $http
        .get('/api/users/' + userNickname + '/playlists/' + encodeURIComponent(playlistName) + '/tracks')
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('get tracks failed for playlist: ' + playlistName);
        })
        .then(function (response) {
          return response.data.songs;
        });
    };
      
    this.addToPlaylist = function (playlistName, track) {
      return $http
        .post('/api/users/me/playlists/' + encodeURIComponent(playlistName) + '/tracks', track)
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

    this.removeFromPlaylist = function (playlistName, track) {
      return $http
        .delete('/api/users/me/playlists/' + encodeURIComponent(playlistName) + '/tracks/' + track._id)
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
