/*
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/
   
function TomahawkResolver () {
    this.getUserConfig = function () {
        return;
    };
    
    this.saveUserConfig = function () {
        throw new Error('not implemented');
    };
}
    
module.exports = TomahawkResolver;
