/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

function AccentCleaner () {
    var PATTERN_LETTERS = /[öäüÖÄÜáàâéèêúùûóòôÁÀÂÉÈÊÚÙÛÓÒÔß]/g,
        LOOKUP_LETTERS  = {
          'ä': 'a', 'ö': 'o', 'ü': 'u',
          'Ä': 'A', 'Ö': 'O', 'Ü': 'U',
          'á': 'a', 'à': 'a', 'â': 'a',
          'é': 'e', 'è': 'e', 'ê': 'e',
          'ú': 'u', 'ù': 'u', 'û': 'u',
          'ó': 'o', 'ò': 'o', 'ô': 'o',
          'Á': 'A', 'À': 'A', 'Â': 'A',
          'É': 'E', 'È': 'E', 'Ê': 'E',
          'Ú': 'U', 'Ù': 'U', 'Û': 'U',
          'Ó': 'O', 'Ò': 'O', 'Ô': 'O',
          'ß': 's'
        };

    function letterTranslator (match) {
      return LOOKUP_LETTERS[match] || match;
    }
   
    this.clean = function (text) {
      return text.replace(PATTERN_LETTERS, letterTranslator);
    }
}

function removeSpecialCharacters (text) {
  var cleanedText = '';

  cleanedText = text.replace(/['".,;:#$%^&*`~\-()\d\/\\\[\]]/g, '');
  cleanedText = cleanedText.replace(/ +/g, ' ');

  return cleanedText;
}

function removeFeaturing (text) {
  var cleanedText = '';

  cleanedText = text.replace(/\( *feat.*\)|\[ *feat.*\]/g, '');

  return cleanedText;
}

var accentCleaner = new AccentCleaner();

exports.clean = function (searchTerm) {
  var cleanedText = searchTerm.toLowerCase();
  
  cleanedText = removeFeaturing(cleanedText);
  cleanedText = accentCleaner.clean(cleanedText);
  cleanedText = removeSpecialCharacters(cleanedText);
  cleanedText = cleanedText.trim();

  return cleanedText;
};
