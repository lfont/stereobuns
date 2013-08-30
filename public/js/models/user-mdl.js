/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function UserMdl ($rootScope, $http, $cookies, $q) {

    function parseCookie (name)  {
      var cookie = $cookies[name],
          json   = cookie.replace('j:', '');
      return JSON.parse(json);
    }

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
    
    this.getName = function () {
      var userCookie;
      if (this.isLoggedIn()) {
        userCookie = parseCookie('user');
        return userCookie.name;
      }
      return null;
    };

    this.hasInvitation = function () {
      var invitationCookie = $cookies.invitation;
      return angular.isDefined(invitationCookie) && invitationCookie !== null;
    };

    this.logout = function () {
      return $http
        .post('/logout');
    };

    this.setInvitationCode = function (code) {
      return $http
        .post('/api/users/me/invitation', { code: code })
        .then(function (response) {
          $rootScope.$broadcast('userMdl:invitation');
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

  UserMdl.$inject = [ '$rootScope', '$http', '$cookies', '$q' ];

  return UserMdl;
});
