/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'angular'
], function (angular) {
    'use strict';
    
    function scrollfixDrtFactory ($document, $window, $parse) {
        
        return {
            link: function (scope, iElement, iAttrs) {
                var top = iElement.offset().top,
                    config = {
                        offset: 0,
                        scroller: $window
                    };
                
                if (iAttrs.uiScrollfix) {
                    config = angular.extend(config, $parse(iAttrs.uiScrollfix)(scope));
                }
                
                if (!config.offset) {
                    config.offset = top;
                } else if (config.offset.charAt(0) === '-') {
                    config.offset = top - parseInt(config.offset.substr(1), 10);
                } else if (config.offset.charAt(0) === '+') {
                    config.offset = top + parseInt(config.offset.substr(1), 10);
                } else {
                    config.offset = parseInt(config.offset, 10);
                }
                
                config.scroller = typeof(config.scroller) === 'object' ?
                    angular.element(config.scroller) :
                    $document.find(config.scroller);
                
                config.scroller.bind('scroll.ui-scrollfix', function () {
                    var element = config.scroller.get(0),
                        offset = element.pageYOffset || element.scrollTop;
                    
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
