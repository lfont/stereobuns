/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

require.config({
    paths: {
        'partials': '../partials',
        'text': '../components/requirejs-text/text',
        'jquery': '../components/jquery/jquery',
        'angular': '../components/angular-unstable/angular',
        'angular-ui-utils-keypress': '../components/angular-ui-utils/modules/keypress/keypress',
        'angular-ui-bootstrap-transition': '../components/angular-ui-bootstrap/src/transition/transition',
        'angular-ui-bootstrap-collapse': '../components/angular-ui-bootstrap/src/collapse/collapse',
        'angular-ui-bootstrap-dialog': '../components/angular-ui-bootstrap/src/dialog/dialog',
        'angular-ui-bootstrap-modal': '../components/angular-ui-bootstrap/src/modal/modal',
        'angular-ui-bootstrap-dropdownToggle': '../components/angular-ui-bootstrap/src/dropdownToggle/dropdownToggle',
        'soundmanager2': '../components/soundmanager/script/soundmanager2',
        'socket.io': '/socket.io/socket.io.js'
    },
    shim: {
        angular: {
            deps: [ 'jquery' ], // replace jqLite by jquery
            exports: 'angular'
        },
        'angular-ui-utils-keypress': {
            deps: [ 'angular' ]
        },
        'angular-ui-bootstrap-dropdownToggle': {
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
        'angular-ui-bootstrap-modal': {
            deps: [ 'angular-ui-bootstrap-dialog' ]
        },
        soundmanager2: {
            exports: 'soundManager'
        },
        'socket.io': {
            exports: 'io'
        }
    },
    packages: [
        'components/song',
        'components/songbar',
        'controllers',
        'services',
        'filters',
        'directives',
        'models'
    ]
});


require([
    'angular',
    'app',
    'templates',
    'routes'
], function (angular, app) {
    'use strict';
    
    var doc = angular.element(document);
    doc.ready(function () {
        var html = doc.find('html');
        angular.bootstrap(html, [ app.name ]);
        // Because of RequireJS we need to bootstrap the app app manually
        // and Angular Scenario runner won't be able to communicate with our app
        // unless we explicitely mark the container as app holder
        // More info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
        html.addClass('ng-app');
    });
});
