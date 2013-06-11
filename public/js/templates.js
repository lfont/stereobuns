/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery',
    'text!partials/stream.html',
    'text!partials/search.html',
    'text!partials/overview.html',
    'text!partials/playlists.html',
    'text!partials/search-filters.html',
    'text!partials/search-result.html'
], function ($, streamTemplate, searchTemplate, overviewTemplate,
             playlistsTemplate, searchFiltersTemplate,
             searchResultTemplate) {
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
        $body.prepend(wrap('stream.html', streamTemplate));
        $body.prepend(wrap('search.html', searchTemplate));
        $body.prepend(wrap('search-filters.html', searchFiltersTemplate));
        $body.prepend(wrap('search-result.html', searchResultTemplate));
        $body.prepend(wrap('overview.html', overviewTemplate));
        $body.prepend(wrap('playlists.html', playlistsTemplate));
    });
});
