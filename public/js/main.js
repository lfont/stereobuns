/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

require.config({
    paths: {
        'partials': '../partials',
        'text': '../components/requirejs-text/text',
        'jquery': '../components/jquery/jquery',
        'angular': '../components/angular/angular',
        'angular-ui-utils-keypress': '../components/angular-ui-utils/modules/keypress/keypress',
        'angular-ui-bootstrap-transition': '../components/angular-ui-bootstrap/src/transition/transition',
        'angular-ui-bootstrap-collapse': '../components/angular-ui-bootstrap/src/collapse/collapse',
        'soundmanager2': '../components/soundmanager/script/soundmanager2'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-ui-utils-keypress': {
            deps: [ 'angular' ]
        },
        'angular-ui-bootstrap-transition': {
            deps: [ 'angular' ]
        },
        'angular-ui-bootstrap-collapse': {
            deps: [ 'angular-ui-bootstrap-transition' ]
        },
        soundmanager2: {
            exports: 'soundManager'
        }
    },
    packages: [
        'controllers',
        'services',
        'filters',
        {
            name: 'lib/tomahawk',
            main: 'tomahawk'
        }
    ]
});


require([
    'jquery',
    'angular',
    'app',
    'templates',
    'routes'
], function ($, angular, app) {
    'use strict';
    
    $(function () {
        var $html = $('html');
        angular.bootstrap($html, [ app.name ]);
        // Because of RequireJS we need to bootstrap the app app manually
        // and Angular Scenario runner won't be able to communicate with our app
        // unless we explicitely mark the container as app holder
        // More info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
        $html.addClass('ng-app');
    });
});
