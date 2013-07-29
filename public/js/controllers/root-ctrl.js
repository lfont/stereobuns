/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function RootCtrl ($scope, $window, $location) {
    $window.onOauthResult = function (success) {
      if (success) {
        $scope.$apply(function () {
          $location.path('/songs/loved');
        });
      }
    };

    $scope.signIn = function (providerName) {
      $window.open('/auth/' + providerName, 'Authentication', 'height=615,width=445,dialog=yes');
    };
  }

  RootCtrl.$inject = [ '$scope', '$window', '$location' ];

  return RootCtrl;
});
