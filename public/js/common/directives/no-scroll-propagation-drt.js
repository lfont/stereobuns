/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function noScrollPropagationDrtFactory () {
      
    return {
      restrict: 'A',
      replace: false,
      scope: false,
      
      link: function (scope, iElement, iAttrs) {
        iElement.bind('mousewheel', function (event) {
          var up = event.originalEvent.wheelDelta > 0;
          
          if (!up &&
              this.scrollTop >= this.scrollHeight - iElement.innerHeight()) {
            event.preventDefault();
          } else if (up && this.scrollTop === 0) {
            event.preventDefault();
          }
        });
      }
    };
  }

  return noScrollPropagationDrtFactory;
});
