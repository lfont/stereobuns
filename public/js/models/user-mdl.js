/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function UserMdl ($http, $cookies, $q) {
    var invitationCode = null;

    this.get = function () {
      return $http
        .get('/api/users/me')
        .then(function (response) {
          return response.data;
        });
    };

    this.isLoggedIn = function () {
      var userCookie = $cookies.user;
      return angular.isDefined(userCookie) && userCookie !== null;
    };

    this.logout = function () {
      return $http
        .post('/logout');
    };

    this.getInvitationCode = function () {
      if (invitationCode) {
        return $q.when(invitationCode);
      }

      return this
        .get()
        .then(function (user) {
          var isValid = angular.isDefined(user.invitationCode) &&
                        user.invitationCode !== null &&
                        user.invitationCode !== '';
          if (isValid) {
            invitationCode = user.invitationCode;
          }
          return invitationCode;
        });
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
  }

  UserMdl.$inject = [ '$http', '$cookies', '$q' ];

  return UserMdl;
});
