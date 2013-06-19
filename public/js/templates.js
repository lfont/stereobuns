/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery',
    'text!partials/search.html',
    'text!partials/search-bar.html',
    'text!partials/audio-player.html',
    'text!partials/audio-player-queue.html',
    'text!partials/playlist-overview.html',
    'text!partials/playlists.html',
    'text!partials/song-drt.html',
    'text!partials/song-bar-drt.html'
], function ($, searchTemplate, searchBarTemplate,
             audioPlayerTemplate, audioPlayerQueueTemplate,
             playlistOverviewTemplate, playlistsTemplate,
             songDrtTemplate, songBarDrtTemplate) {
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
        $body.prepend(wrap('search.html', searchTemplate));
        $body.prepend(wrap('search-bar.html', searchBarTemplate));
        $body.prepend(wrap('audio-player.html', audioPlayerTemplate));
        $body.prepend(wrap('audio-player-queue.html', audioPlayerQueueTemplate));
        $body.prepend(wrap('playlist-overview.html', playlistOverviewTemplate));
        $body.prepend(wrap('playlists.html', playlistsTemplate));
        $body.prepend(wrap('song-drt.html', songDrtTemplate));
        $body.prepend(wrap('song-bar-drt.html', songBarDrtTemplate));
    });
});
