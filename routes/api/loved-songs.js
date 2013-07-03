/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var models = require('../../models');

exports.index = function (req, res) {
    models.songs.loved(req.user.id, function (err, songs) {
        if (err) {
            res.send(400, { error: err });
            return;
        }
        res.send(songs);
    });
};

exports.create = function (req, res) {
    models.songs.love(req.user.id, req.body, function (err) {
        if (err) {
            res.send(400, { error: err });
            return;
        }
        res.send({ result: 'ok' });
    });
};

exports.update = function (req, res) {
    models.songs.unlove(req.user.id, req.body.url, function (err) {
        if (err) {
            res.send(400, { error: err });
            return;
        }
        res.send({ result: 'ok' });
    });
};
