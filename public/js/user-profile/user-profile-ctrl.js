/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function UserProfileCtrl ($scope, $routeParams, userMdl) {
    userMdl
      .getUser($routeParams.user)
      .then(function (user) {
        $scope.user = user;  
      });
  }
  
  UserProfileCtrl.$inject = [ '$scope', '$routeParams', 'userMdl' ];
  
  return UserProfileCtrl;
});
