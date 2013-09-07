/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

require.config({
  paths: {
    'templates': '../templates',
    'text': '../components/requirejs-text/text',
    'angular': '../components/angular/angular',
    'angular-route': '../components/angular-route/angular-route',
    'angular-cookies': '../components/angular-cookies/angular-cookies',
    'angular-animate': '../components/angular-animate/angular-animate',
    'angular-sanitize': '../components/angular-sanitize/angular-sanitize',
    'angular-ui-bootstrap-template': '../components/angular-ui-bootstrap/template',
    'angular-ui-bootstrap-transition': '../components/angular-ui-bootstrap/src/transition/transition',
    'angular-ui-bootstrap-collapse': '../components/angular-ui-bootstrap/src/collapse/collapse',
    'angular-ui-bootstrap-dialog': '../components/angular-ui-bootstrap/src/dialog/dialog',
    'angular-ui-bootstrap-dropdownToggle': '../components/angular-ui-bootstrap/src/dropdownToggle/dropdownToggle',
    'angular-ui-bootstrap-alert': '../components/angular-ui-bootstrap/src/alert/alert',
    'soundmanager2': '../components/soundmanager/script/soundmanager2',
    'observable': 'lib/observable'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-route': {
      deps: [ 'angular' ]
    },
    'angular-cookies': {
      deps: [ 'angular' ]
    },
    'angular-animate': {
      deps: [ 'angular' ]
    },
    'angular-sanitize': {
      deps: [ 'angular' ]
    },
    'angular-ui-bootstrap-dropdownToggle': {
      deps: [ 'angular' ]
    },
    'angular-ui-bootstrap-alert': {
      deps: [ 'angular' ]
    },
    'angular-ui-bootstrap-transition': {
      deps: [ 'angular' ]
    },
    'angular-ui-bootstrap-collapse': {
      deps: [ 'angular-ui-bootstrap-transition' ]
    },
    'angular-ui-bootstrap-dialog': {
      deps: [ 'angular-ui-bootstrap-transition' ]
    },
    soundmanager2: {
      exports: 'soundManager'
    }
  },
  packages: [
    // TODO
    'components/playlist-chooser',
    'components/song-progress',
    'components/songs-actions',
    'controllers',
    'models',
    // common
    'common',
    // features
    'artist-info',
    'audio-player',
    'home',
    'keyboard-shortcuts',
    'layout',
    'settings',
    'track',
    'track-info',
    'track-search',
    'user'
  ]
});


require([
  'angular',
  'app',
  'routes',
  'templates-loader'
], function (angular, app, routes, templatesLoader) {
  'use strict';

  var doc = angular.element(document);
  doc.ready(function () {
    var html = doc.find('html');
    angular.bootstrap(html, [ app.name, routes.name, templatesLoader.name ]);
    // Because of RequireJS we need to bootstrap the app app manually
    // and Angular Scenario runner won't be able to communicate with our app
    // unless we explicitely mark the container as app holder
    // More info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
    html.addClass('ng-app');
  });
});
