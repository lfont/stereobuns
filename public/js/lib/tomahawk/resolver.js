/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
   
    function TomahawkResolver () {
        this.getUserConfig = function () {
            return;
        };
        
        this.saveUserConfig = function () {
            throw new Error('not implemented');
        };
    }
    
    return TomahawkResolver;
});
