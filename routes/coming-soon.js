/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

exports.index = function (req, res) {
  res.render('coming-soon/index', {
    title: 'Coming Soon'
  });
};
