/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function (angular) {
  'use strict';

  function UserMenuCtrl ($scope, $location, userMdl) {
    $scope.user = userMdl.get();

    $scope.signOut = function () {
      userMdl
        .logout()
        .then(function () {
          $location.path('/');
        });
    };
  }

  UserMenuCtrl.$inject = [ '$scope', '$location', 'userMdl' ];

  return UserMenuCtrl;
});
