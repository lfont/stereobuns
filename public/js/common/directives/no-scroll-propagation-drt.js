/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
  'use strict';
  
  function noScrollPropagationDrtFactory () {
    var notDefined;
    
    return {
      restrict: 'A',
      replace: false,
      scope: false,
      
      link: function (scope, iElement, iAttrs) {
        var scrollEventName, iScrollUp;

        if (iElement[0]['onmousewheel'] !== notDefined) {
          scrollEventName = 'mousewheel';
          iScrollUp = function (event) {
            return event.wheelDelta > 0;
          };
        } else {
          scrollEventName = 'wheel';
          iScrollUp = function (event) {
            return event.deltaY < 0;
          };
        }
        
        iElement.on(scrollEventName, function (event) {
          var up = iScrollUp(event);

          if (!up && this.scrollTop >= this.scrollHeight - this.clientHeight) {
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
