/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function songFtlFactory (filterFilter) {
        
        function areEquals (value1, value2) {
            return value1.localeCompare(value2,
                                        'en-US',
                                        { sensitivity: 'base' }) === 0;
        }
        
        function song (songs, property, value) {
            var expectedWords = value.split(/ +/);
            
            function predicate (song) {
                var expectedWordIndex = 0,
                    actualWords, i, len;
                
                if (!song[property]) {
                    return false;
                }
                
                actualWords = song[property].split(/ +/);
                for (i = 0, len = actualWords.length; i < len; i++) {
                    if (areEquals(expectedWords[expectedWordIndex], actualWords[i])) {
                        if (++expectedWordIndex === expectedWords.length) {
                            return true;
                        }
                    } else {
                        expectedWordIndex = 0;
                    }
                }
        
                return false;
            }
            
            return property ? filterFilter(songs, predicate) : songs;
        }
        
        return song;
    }
    
    songFtlFactory.$inject = [ 'filterFilter' ];
    
    return songFtlFactory;
});
