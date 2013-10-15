/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';

  function cacheFct ($cacheFactory) {
    var cacheMap = {};
    
    function Cache (id) {
      var cache  = $cacheFactory(id),
          values = [];
          
      this.get = function (key) {
        return cache.get(key);
      };
      
      this.put = function (key, value, isHidden) {
        if (!this.get(key)) {
          cache.put(key, value);
          if (!isHidden) {
            values.push(value);
          }
        }
      };
      
      this.remove = function (key) {
        var value = this.get(key),
            valueIndex;
            
        if (value) {
          cache.remove(key);
          valueIndex = values.indexOf(value);
          if (valueIndex !== -1) {
            values.splice(valueIndex, 1);
          }
        }
      };
      
      this.values = function () {
        return values;
      };
    }
    
    return function (cacheId) {
      if (!cacheMap[cacheId]) {
        cacheMap[cacheId] = new Cache(cacheId);
      }
      return cacheMap[cacheId];
    };
  }
  
  cacheFct.$inject = [ '$cacheFactory' ];
  
  return cacheFct;
});
