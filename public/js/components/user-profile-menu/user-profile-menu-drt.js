/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function userProfileMenuDrtFactory () {

    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'user-profile-menu-drt.html',
      controller: 'UserProfileMenuDrtCtrl'
    };
  }
  
  return userProfileMenuDrtFactory;
});
