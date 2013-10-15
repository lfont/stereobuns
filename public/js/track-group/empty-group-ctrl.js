/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function EmptyGroupCtrl ($scope, $routeParams, userMdl) {
    var group = $routeParams.group || 'loved',
        isLoggedUser = userMdl.isLoggedUser($routeParams.user);
    
    $scope.message = null;
    
    switch (group) {
      case 'loved':
        if (isLoggedUser) {
          $scope.message = 'You don\'t have any loved song for the moment.<br />' +
                           'Let\'s search for new music. Once you find a song that you love,' +
                           'click on the <i class="icon-heart"></i> button to love it.<br />' +
                           'Loved songs will appear on this page.';
        } else {
          $scope.message = $routeParams.user + ' has no loved song.'
        }
        break;
      case 'mostplayed':
        if (isLoggedUser) {
          $scope.message = 'You haven\'t listen any song for the moment.<br />' +
                           'Let\'s search for new music. When you listen to a song,' +
                           'StereoBuns will keep track of how often you play it.<br />' +
                           'Your most played songs will appear on this page.';
        } else {
          $scope.message = $routeParams.user + ' has no most played song.'
        }
        break;
    }
  }
  
  EmptyGroupCtrl.$inject = [ '$scope', '$routeParams', 'userMdl' ];

  return EmptyGroupCtrl;
});
