/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.index = function (req, res) {
    models.playlists.countSongs(req.user.id, function (err, playlists) {
        if (err) {
            res.send(400, { error: err });
            return;
        }
        res.send(playlists);
    });
};

exports.show = function (req, res) {
    models.playlists.findByName(req.user.id, req.params.name, function (err, playlist) {
        if (err) {
            res.send(400, { error: err });
            return;
        }
        res.send(playlist);
    });
};
