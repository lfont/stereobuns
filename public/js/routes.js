/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'app'
], function (app) {
    'use strict';
    
    return app.config([
        '$locationProvider',
        '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.when('/search', { templateUrl: 'search.html', controller: 'SearchCtrl' })
                          .when('/playlist/:name', { templateUrl: 'playlist.html', controller: 'PlaylistCtrl' })
                          .otherwise({ redirectTo: '/playlist/Loved' });
        }
    ]);
});
