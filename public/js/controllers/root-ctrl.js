/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function RootCtrl ($scope, $window, $location, userMdl) {

    function openAuthDialog (providerName) {
      var height = 620,
          width  = 450,
          top    = $window.screen.height / 2 - height / 2,
          left   = $window.screen.width / 2 - width / 2;

      $window.open('/auth/' + providerName,
                   'Authentication',
                   'dialog=yes, ' +
                   'height=' + height + ',width=' + width + ',' +
                   'top=' + top + ',left=' + left);
    }

    $window.setAuthResult = function (success) {
      if (success) {
        $scope.$apply(function () {
          $location.path('/' + userMdl.getName() + '/tracks/loved');
        });
      }
    };

    $scope.contactAddress = 'contact@stereobuns.com';

    $scope.signIn = function (providerName) {
      openAuthDialog(providerName);
    };
  }

  RootCtrl.$inject = [ '$scope', '$window',
                       '$location', 'userMdl' ];

  return RootCtrl;
});
