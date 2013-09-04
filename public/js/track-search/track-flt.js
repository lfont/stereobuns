/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function trackFtlFactory (filterFilter) {
  
    function areEquals (value1, value2) {
      return value1.localeCompare(value2,
                                  'en-US',
                                  { sensitivity: 'base' }) === 0;
    }
    
    return function (tracks, property, value) {
      var expectedWords = value.split(/ +/);
      
      function predicate (track) {
        var expectedWordIndex = 0,
            actualWords, i, len;
        
        if (!track[property]) {
          return false;
        }
        
        actualWords = track[property].split(/ +/);
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
      
      return property ? filterFilter(tracks, predicate) : tracks;
    };
  }
  
  trackFtlFactory.$inject = [ 'filterFilter' ];
  
  return trackFtlFactory;
});
