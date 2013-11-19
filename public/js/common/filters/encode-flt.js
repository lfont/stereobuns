/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function encodeFtlFactory () {
    
    function encode (value) {
      return encodeURIComponent(value);
    }
    
    return encode;
  }
  
  return encodeFtlFactory;
});
