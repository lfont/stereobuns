/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function sentenceFilterFtlFactory (filterFilter) {
  
    function areEquals (value1, value2) {
      return value1.localeCompare(value2,
                                  'en-US',
                                  { sensitivity: 'base' }) === 0;
    }
    
    return function (items, property, value) {
      var expectedWords;
      
      if (!property || !value) {
        return items;
      }
      
      expectedWords = value.split(/ +/);
      
      function predicate (item) {
        var expectedWordIndex = 0,
            actualWords, i, len;
        
        if (!item[property]) {
          return false;
        }
        
        actualWords = item[property].split(/ +/);
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
      
      return filterFilter(items, predicate);
    };
  }
  
  sentenceFilterFtlFactory.$inject = [ 'filterFilter' ];
  
  return sentenceFilterFtlFactory;
});
