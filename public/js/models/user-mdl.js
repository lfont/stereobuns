/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function UserMdl ($http, $cookies) {
    this.get = function () {
      return $http
        .get('/api/users/me', { cache: true })
        .error(function (data, status, headers, config) {
          // TODO: handle error
        });
    };

    this.isLoggedIn = function () {
      var userCookie = $cookies.user;
      return angular.isDefined(userCookie) && userCookie !== null;
    };

    this.logout = function () {
      return $http
        .post('/logout')
        .error(function (data, status, headers, config) {
          // TODO: handle error
        });
    };
  }

  UserMdl.$inject = [ '$http', '$cookies' ];

  return UserMdl;
});
