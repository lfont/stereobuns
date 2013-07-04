/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.create = function (req, res) {
    models.songs.addToPlaylist(req.user.id, req.params.name, req.body, function (err, song) {
        if (err) {
            res.send(400, { error: err });
            return;
        }
        res.send({ success: true });
    });
};

exports.destroy = function (req, res) {
    models.songs.removeFromPlaylist(req.user.id, req.params.name, req.params.id, function (err) {
        if (err) {
            res.send(400, { error: err });
            return;
        }
        res.send({ success: true });
    });
};
