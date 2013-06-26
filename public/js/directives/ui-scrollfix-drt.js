/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function scrollfixDrtFactory ($document, $window, $parse) {
        
        function computeOffset (iElement, offset) {
            var top = iElement.offset().top;
            
            if (!offset) {
                return top;
            } else if (offset.charAt(0) === '-') {
                return top - parseInt(offset.substr(1), 10);
            } else if (offset.charAt(0) === '+') {
                return top + parseInt(offset.substr(1), 10);
            }
            
            return parseInt(offset, 10);
        }
        
        return {
            link: function (scope, iElement, iAttrs) {
                var offsetReady = false,
                    config = {
                        offset: 0,
                        scroller: $window
                    };
                
                if (iAttrs.uiScrollfix) {
                    config = angular.extend(config, $parse(iAttrs.uiScrollfix)(scope));
                }
                
                config.scroller = typeof(config.scroller) === 'object' ?
                    angular.element(config.scroller) :
                    $document.find(config.scroller);
                
                config.scroller.bind('scroll.ui-scrollfix', function () {
                    var element = config.scroller.get(0),
                        offset = element.pageYOffset || element.scrollTop || 0;
                    
                    if (!offsetReady) {
                        // It should be safe to compute the offset now.
                        config.offset = computeOffset(iElement, config.offset);
                        offsetReady = true;
                    }
                    
                    if (!iElement.hasClass('ui-scrollfix') && offset > config.offset) {
                        iElement.addClass('ui-scrollfix');
                    } else if (iElement.hasClass('ui-scrollfix') && offset < config.offset) {
                        iElement.removeClass('ui-scrollfix');
                    }
                });
            }
        };
    }
    
    scrollfixDrtFactory.$inject = [ '$document', '$window', '$parse' ];

    return scrollfixDrtFactory;
});
