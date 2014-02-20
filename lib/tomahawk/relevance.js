/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var FuzzySet = require('fuzzyset.js');

function Relevance (query) {
  this.fuzzySet = new FuzzySet();
  this.fuzzySet.add(query);
}

Relevance.prototype.compute = function (track) {
  var match = this.fuzzySet.get(track.artist + ' ' + track.name);
  
  if (!match) {
    return 0;
  }

  return match[0][0];
};

module.exports = Relevance;
