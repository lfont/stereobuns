/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function TrackGroupSrv ($http, $window) {

    this.getTracks = function (user, group) {
      return $http
        .get('/api/users/' + user + '/songs/' + group)
        .error(function (data, status, headers, config) {
          // TODO: handle error
          $window.console.log('get tracks failed for group: ' + group);
        })
        .then(function (response) {
          return response.data.songs;
        });
    };
      
    this.add = function (group, track) {
      return $http
        .post('/api/users/me/songs/' + group, track)
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

    this.remove = function (group, track) {
      return $http
        .put('/api/users/me/songs/' + group, track)
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

  TrackGroupSrv.$inject = [ '$http', '$window' ];

  return TrackGroupSrv;
});
