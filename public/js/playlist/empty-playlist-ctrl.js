/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function EmptyPlaylistCtrl ($scope, $routeParams, userMdl) {
    var isLoggedUser = userMdl.isLoggedUser($routeParams.user);
    
    $scope.message = null;

    if (isLoggedUser) {
      $scope.message = 'You don\'t have any song in this playlist for the moment.<br />' +
                       'Once you find a song that you want to add, ' + 
                       'click on the <i class="icon-reorder"></i> button to select the playlist.<br />' +
                       'Let\'s search for new music now!';
    } else {
      $scope.message = $routeParams.user + ' has no track in this playlist.'
    }
  }
  
  EmptyPlaylistCtrl.$inject = [ '$scope', '$routeParams', 'userMdl' ];

  return EmptyPlaylistCtrl;
});
