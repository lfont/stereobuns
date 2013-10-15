/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function UserMdl ($rootScope, userSrv) {
    
    this.isLoggedIn = function () {
      var cookie = userSrv.getUserCookie();
      return angular.isDefined(cookie) && cookie !== null;
    };
    
    this.hasInvitation = function () {
      var cookie = userSrv.getInvitationCookie();
      return angular.isDefined(cookie) && cookie !== null;
    };
    
    this.getNickname = function () {
      if (this.isLoggedIn()) {
        return userSrv.getUserCookie().name;
      }
      return null;
    };
    
    this.resolveNickname = function (userNickname) {
      if (!userNickname) {
        return 'me';
      }
      
      if (userNickname === this.getNickname()) {
        return 'me';
      }
      
      return userNickname;
    };
    
    this.getUser = function (userNickname) {
      var nickname = this.resolveNickname(userNickname);
      return userSrv.getUser(nickname);
    };
    
    this.isLoggedUser = function (userNickname) {
      var nickname = this.resolveNickname(userNickname);
      return nickname === 'me';
    };
    
    this.setInvitationCode = function (code) {
      return userSrv.setInvitationCode(code)
        .then(function (data) {
          $rootScope.$broadcast('userMdl:setInvitationCode');
          return data;
        });
    };
  }
  
  UserMdl.$inject = [ '$rootScope', 'userSrv' ];
  
  return UserMdl;
});
