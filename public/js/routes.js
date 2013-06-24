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
            // TODO: The server must knows the routes before we can enable the html5 mode.
            $locationProvider.html5Mode(false);
            $routeProvider.when('/search', { templateUrl: 'search.html', controller: 'SearchCtrl' })
                          .when('/playlist/:name', { templateUrl: 'playlist.html', controller: 'PlaylistCtrl' })
                          .otherwise({ redirectTo: '/playlist/Loved' });
        }
    ]);
});
