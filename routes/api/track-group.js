/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var securityMiddleware = require('../middleware/security'),
    models             = require('../../models');


function getLovedTracks (req, res) {
  
  function findByUserId (userId) {
    models.songs.loved.findByUserId(
      userId,
      function (err, tracks) {
        if (err) {
          res.send(400, { error: err });
          return;
        }
        res.send(tracks);
      });
  }
  
  if (req.params.user === 'me') {
    findByUserId(req.user.id);
  } else {
    models.users.findByNickname(req.params.user, function (err, user) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      
      findByUserId(user._id);
    });
  }
}

function addLovedTrack (req, res) {
  models.songs.loved.add(
    req.user.id,
    req.body,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}

function removeLovedTrack (req, res) {
  models.songs.loved.remove(
    req.user.id,
    req.body.url,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}

function getQueuedTracks (req, res) {
  models.songs.queued.findByUserId(
    req.user.id,
    function (err, songs) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send(songs);
    });
}

function queueTrack (req, res) {
  models.songs.queued.add(
    req.user.id,
    req.body,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}

function unqueueTrack (req, res) {
  models.songs.queued.remove(
    req.user.id,
    req.body.url,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}

function getMostPlayedTracks (req, res) {
  
  function findByUserId (userId) {
    models.songs.mostPlayed.findByUserId(
      userId,
      function (err, tracks) {
        if (err) {
          res.send(400, { error: err });
          return;
        }
        res.send(tracks);
      });
  }
  
  if (req.params.user === 'me') {
    findByUserId(req.user.id);
  } else {
    models.users.findByNickname(req.params.user, function (err, user) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      
      findByUserId(user._id);
    });
  }
}

function incrementTrackPlayCount (req, res) {
  models.songs.mostPlayed.incrementPlayCount(
    req.user.id,
    req.body.url,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}


module.exports = function (app) {
  app.get('/api/users/:user/tracks/loved',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          getLovedTracks);

  app.post('/api/users/me/tracks/loved',
           securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
           addLovedTrack);

  app.put('/api/users/me/tracks/loved',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          removeLovedTrack);

  app.get('/api/users/me/tracks/queued',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          getQueuedTracks);
  
  app.post('/api/users/me/tracks/queued',
           securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
           queueTrack);

  app.put('/api/users/me/tracks/queued',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          unqueueTrack);

  app.get('/api/users/:user/tracks/mostplayed',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          getMostPlayedTracks);

  app.post('/api/users/me/tracks/mostplayed',
           securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
           incrementTrackPlayCount);
};
