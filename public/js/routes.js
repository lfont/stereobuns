/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'app'
], function (app) {
    'use strict';
    
    return app.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', { templateUrl: 'search.html', controller: 'SearchCtrl' })
                          .otherwise({ redirectTo: '/' });
        }
    ]);
});
