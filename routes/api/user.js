/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

exports.get = function (req, res) {
    res.send(req.user);
};
