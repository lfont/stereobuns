/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular',
    'text!partials/search.html',
    'text!partials/search-bar.html',
    'text!partials/audio-player-bar.html',
    'text!partials/audio-player-queue.html',
    'text!partials/song-drt.html',
    'text!partials/song-bar-drt.html',
    'text!partials/playlists.html',
    'text!partials/playlist.html',
    'text!partials/songs.html',
    'text!partials/user-menu.html'
], function (angular, searchTemplate, searchBarTemplate,
             audioPlayerBarTemplate, audioPlayerQueueTemplate,
             songDrtTemplate, songBarDrtTemplate,
             playlistsTemplate, playlistTemplate,
             songsTemplate, userMenuTemplate) {
    'use strict';
    
    function wrap (name, content) {
        var script = document.createElement('script');
        script.id = name;
        script.type = 'text/ng-template';
        script.innerHTML = content;
        return script;
    }
    
    angular.element(document).ready(function () {
        var body = angular.element(document.body);
        body.prepend(wrap('search.html', searchTemplate));
        body.prepend(wrap('search-bar.html', searchBarTemplate));
        
        body.prepend(wrap('audio-player-bar.html', audioPlayerBarTemplate));
        body.prepend(wrap('audio-player-queue.html', audioPlayerQueueTemplate));
        
        body.prepend(wrap('song-drt.html', songDrtTemplate));
        body.prepend(wrap('song-bar-drt.html', songBarDrtTemplate));
        
        body.prepend(wrap('playlists.html', playlistsTemplate));
        body.prepend(wrap('playlist.html', playlistTemplate));
        
        body.prepend(wrap('songs.html', songsTemplate));
        
        body.prepend(wrap('user-menu.html', userMenuTemplate));
    });
});
