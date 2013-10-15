/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function UserSrv ($http, $cookies, $q) {

    function parseCookie (cookie)  {
      var json = cookie.replace('j:', '');
      return JSON.parse(json);
    }
    
    this.getUserCookie = function () {
      if ($cookies.user) {
        return parseCookie($cookies.user);
      }
      return null;
    };
    
    this.getInvitationCookie = function () {
      return $cookies.invitation;
    };

    this.getUser = function (nickname) {
      return $http
        .get('/api/users/' + nickname)
        .then(function (response) {
          return response.data;
        });
    };

    this.logout = function () {
      return $http
        .post('/logout');
    };

    this.setInvitationCode = function (code) {
      return $http
        .post('/api/users/me/invitation', { code: code })
        .then(function (response) {
          return response.data;
        }, function (response) {
          var error;

          if (response.data.error.code === 'ERRINVALID') {
            error = {
              isBusiness: true,
              title: 'Sorry,',
              message: 'The invitation code is not valid.'
            };
          } else {
            error = {
              title: 'Oops,',
              message: 'An error has occured. Please, try again.'
            };
          }

          return $q.reject(error);
        });
    };

    this.delete = function () {
      return $http
        .delete('/api/users/me')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return $q.reject({
            title: 'Oops,',
            message: 'An error has occured. Please, try again.'
          });
        });
    };
  }

  UserSrv.$inject = [ '$http', '$cookies', '$q' ];

  return UserSrv;
});
