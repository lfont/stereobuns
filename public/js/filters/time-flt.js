/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

define(function () {
    'use strict';
    
    function timeFtlFactory () {
        
        function toTime (totalSeconds) {
            var hours, minutes, seconds, time;
            
            if (!totalSeconds) {
                return '00:00';
            }
            
            totalSeconds = parseInt(totalSeconds, 10);
            hours = Math.floor(totalSeconds / 3600);
            minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
            seconds = totalSeconds - (hours * 3600) - (minutes * 60);
            
            if (hours < 10) {
                hours = '0' + hours;
            }
            
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            
            time = minutes + ':' + seconds;
            
            if (hours !== '00') {
                time = hours + ':' + time;
            }
            
            return time;
        }
        
        return toTime;
    }
    
    return timeFtlFactory;
});
