/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function UserProfileCtrl ($scope, userSrv) {
    $scope.user = userSrv.get();
  }
  
  UserProfileCtrl.$inject = [ '$scope', 'userSrv' ];
  
  return UserProfileCtrl;
});
