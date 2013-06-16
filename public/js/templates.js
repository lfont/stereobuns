/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'jquery',
    'text!partials/stream.html',
    'text!partials/search.html',
    'text!partials/search-filters.html',
    'text!partials/search-playlist.html',
    'text!partials/audio-player.html',
    'text!partials/audio-player-queue.html',
    'text!partials/playlist-overview.html',
    'text!partials/playlists.html',
    'text!partials/song-drt.html'
], function ($, streamTemplate, searchTemplate,
             searchFiltersTemplate, searchPlaylistTemplate,
             audioPlayerTemplate, audioPlayerQueueTemplate,
             playlistOverviewTemplate, playlistsTemplate,
             songDrtTemplate) {
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
        $body.prepend(wrap('search-playlist.html', searchPlaylistTemplate));
        $body.prepend(wrap('audio-player.html', audioPlayerTemplate));
        $body.prepend(wrap('audio-player-queue.html', audioPlayerQueueTemplate));
        $body.prepend(wrap('playlist-overview.html', playlistOverviewTemplate));
        $body.prepend(wrap('playlists.html', playlistsTemplate));
        $body.prepend(wrap('song-drt.html', songDrtTemplate));
    });
});
