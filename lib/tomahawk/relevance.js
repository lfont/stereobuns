/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

// http://en.wikipedia.org/wiki/Levenshtein_distance
function computeLevenshteinDistance (s, t) {
  // degenerate cases
  if (s === t) {
    return 0;
  }

  if (s.length === 0) {
    return t.length;
  }

  if (t.length === 0) {
    return s.length;
  }

  // create two work vectors
  var v0 = [];
  var v1 = [];

  var i;

  // initialize v0 (the previous row of distances)
  // this row is A[0][i]: edit distance for an empty s
  // the distance is just the number of characters to delete from t
  for (i = 0; i < t.length + 1; i++) {
    v0[i] = i;
  }

  for (i = 0; i < s.length; i++) {
    // calculate v1 (current row distances) from the previous row v0

    // first element of v1 is A[i+1][0]
    //   edit distance is delete (i+1) chars from s to match empty t
    v1[0] = i + 1;

    var j;

    // use formula to fill in the rest of the row
    for (j = 0; j < t.length; j++) {
      var cost = (s[i] === t[j]) ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }

    // copy v1 (current row) to v0 (previous row) for next iteration
    for (j = 0; j < v0.length; j++) {
      v0[j] = v1[j];
    }
  }

  return v1[t.length];
}

function computeRelevance (s, t) {
  var max      = s.length + t.length,
      distance = computeLevenshteinDistance(s, t);

  // 1 = perfect match, 0 = no match
  return 1 - distance / max;
}

function Relevance (expected) {
  this.expected = expected;
}

Relevance.prototype.compute = function (actual) {
  return computeRelevance(this.expected, actual);
};

module.exports = Relevance;
