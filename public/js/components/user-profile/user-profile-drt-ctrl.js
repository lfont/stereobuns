/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function UserProfileDrtCtrl ($scope, userMdl) {
    $scope.user = userMdl.get();
  }
  
  UserProfileDrtCtrl.$inject = [ '$scope', 'userMdl' ];
  
  return UserProfileDrtCtrl;
});
