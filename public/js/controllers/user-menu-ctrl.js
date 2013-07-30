/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function (angular) {
  'use strict';

  function UserMenuCtrl ($scope, $location, userMdl) {
    function loadUser () {
      var promise = userMdl.get();
      promise.then(function (response) {
        $scope.user = response.data;
      }, function (response) {
        // TODO: handle error            
      });
    }

    $scope.user = null;

    $scope.signOut = function () {
      var promise = userMdl.logout();
      promise.then(function () {
        $location.path('/');
      });
    };

    loadUser();
  }

  UserMenuCtrl.$inject = [ '$scope', '$location', 'userMdl' ];

  return UserMenuCtrl;
});
