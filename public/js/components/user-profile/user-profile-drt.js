/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function userProfileDrtFactory () {

    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'user-profile-drt.html',
      controller: 'UserProfileDrtCtrl'
    };
  }
  
  return userProfileDrtFactory;
});
