/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.all = function (req, res) {
    models.playlist.getPlaylists(req.user.id, function (err, playlists) {
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send(playlists);
    });
};

exports.get = function (req, res) {
    models.playlist.getPlaylist(req.user.id, req.params.name, function (err, playlist) {
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send(playlist);
    });
};
