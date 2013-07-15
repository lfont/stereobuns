/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'text!angular-ui-bootstrap-template/progressbar/progress.html',
    'text!angular-ui-bootstrap-template/progressbar/bar.html'
], function (angular,
             progressTemplate, barTemplate) {
    'use strict';
    
    var angularUiTemplateModule = angular.module('soundrocket.templates.angular-ui', []);
    
    angularUiTemplateModule.run(['$templateCache', function ($templateCache) {
        $templateCache.put('template/progressbar/progress.html', progressTemplate);
        $templateCache.put('template/progressbar/bar.html', barTemplate);
    }]);
    
    return angularUiTemplateModule;
});
