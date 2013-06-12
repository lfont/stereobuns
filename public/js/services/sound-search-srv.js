/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'lib/tomahawk'
], function (Tomahawk) {
    'use strict';
    
    function SoundSearchSrvFactory ($q, $rootScope) {
        var tomahawk = new Tomahawk([
            'soundcloud',
            'exfm'
        ]);
        
        function getArtworks (songs) {
            var i, len;
            
            // TODO: should be done in the playlist by a worker?
            for (i = 0, len = songs.length; i < len; i++) {
                songs[i].artworkUrl = '/img/120_album.png';
            }
        }
        
        return {
            search: function (searchString) {
                var deferred = $q.defer();
                
                var promise = tomahawk.search(searchString);
                promise.done(function (results) {
                    var playlist;
                    
                    getArtworks(results);
                    
                    playlist = {
                        type: 'search',
                        name: searchString,
                        songs: results
                    };
                    
                    deferred.resolve(playlist);
                    $rootScope.$apply();
                });
                promise.fail(function (error) {
                    deferred.reject(error);
                    $rootScope.$apply();
                });
                
                return deferred.promise;
            }
        };
    }
    
    SoundSearchSrvFactory.$inject = [ '$q', '$rootScope' ];
    
    return SoundSearchSrvFactory;
});
