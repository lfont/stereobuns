/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery',
    'text!partials/main.html',
    'text!partials/search.html'
], function ($, mainTemplate, searchTemplate) {
    'use strict';
    
    function wrap (name, content) {
        var script = document.createElement('script');
        script.type = 'text/ng-template';
        script.id = name;
        script.innerHTML = content;
        return script;
    }
    
    $(function () {
        var $body = $(document.body);
        $body.prepend(wrap('main.html', mainTemplate));
        $body.prepend(wrap('search.html', searchTemplate));
    });
});
