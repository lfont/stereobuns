/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define([
    'lib/tomahawk'
], function (Tomahawk) {
    'use strict';
    
    var tomahawk = new Tomahawk([
        'soundcloud',
        'exfm'
    ]);
    
    function SoundSearchSrvFactory ($rootScope) {
        var qid;
        
        tomahawk.on('searchResult', function (result) {
            if (result.qid !== qid) {
                return;
            }
            
            $rootScope.$broadcast('soundSearch:result', result);
            $rootScope.$apply();
        });
        
        return {
            search: function (searchString) {
                qid = tomahawk.search(searchString);
            }
        };
    }
    
    SoundSearchSrvFactory.$inject = [ '$rootScope' ];
    
    return SoundSearchSrvFactory;
});
