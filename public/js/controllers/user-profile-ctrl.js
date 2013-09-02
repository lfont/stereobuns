/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function UserProfileCtrl ($scope, userMdl) {
    $scope.user = userMdl.get();
  }
  
  UserProfileCtrl.$inject = [ '$scope', 'userMdl' ];
  
  return UserProfileCtrl;
});
