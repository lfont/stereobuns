/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

function cleanText (text) {
  var cleanedText = text || '',
      index       = cleanedText.indexOf('(');

  if (index > -1) {
    cleanedText = cleanedText.substring(0, index);
  }

  index = cleanedText.indexOf('[');

  if (index > -1) {
    cleanedText = cleanedText.substring(0, index);
  }

  return cleanedText;
}

function Relevance (query) {
  this.descriptionWords = query.toLowerCase().split(' ');
}

Relevance.prototype.compute = function (track) {
  var artistRelevance  = 0,
      nameRelevance    = 0,
      artist           = cleanText(track.artist).toLowerCase(),
      name             = cleanText(track.name).toLowerCase(),
      artistWords      = track.artist.split(' '),
      nameWords        = track.name.split(' '),
      relevance;

  this.descriptionWords.forEach(function (word) {
    if (artist.indexOf(word) > -1) {
      artistRelevance += 1;
    }

    if (name.indexOf(word) > -1) {
      nameRelevance += 1;
    }
  });

  if (artistRelevance < artistWords.length) {
    artistRelevance -= 1;
  }

  if (nameRelevance < nameWords.length) {
    nameRelevance -= 1;
  }

  if (this.descriptionWords.length === artistRelevance) {
    artistRelevance += nameRelevance ? 2 : 1;
  }

  if (this.descriptionWords.length === nameRelevance) {
    nameRelevance += artistRelevance ? 2 : 1;
  }

  return artistRelevance + nameRelevance;
};

module.exports = Relevance;
