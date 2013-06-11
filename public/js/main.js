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
        'angular-ui': '../components/angular-ui/build/angular-ui'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-ui': {
            deps: [ 'angular' ]
        }
    },
    packages: [
        'controllers',
        'services',
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
