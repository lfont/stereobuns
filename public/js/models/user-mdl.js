/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function UserMdl ($http, $cookies) {
    this.getUser = function () {
      return $http
        .get('/api/users/me', { cache: true })
        .error(function (data, status, headers, config) {
          // TODO: handle error
        });
    };

    this.isAuthenticated = function () {
      var userCookie = $cookies.user;
      return angular.isDefined(userCookie) && userCookie !== null;
    };

    this.signOut = function () {
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
