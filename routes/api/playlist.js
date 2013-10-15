/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
*/

var securityMiddleware = require('../middleware/security'),
    models             = require('../../models');


function getPlaylists (req, res) {
  
  function countByUserId (userId) {
    models.playlists.countSongsByPlaylists(
      userId,
      function (err, playlists) {
        if (err) {
          res.send(400, { error: err });
          return;
        }
        res.send(playlists);
      });
  }
    
  if (req.params.user === 'me') {
    countByUserId(req.user.id);
  } else {
    models.users.findByNickname(req.params.user, function (err, user) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      
      countByUserId(user._id);
    });
  }
}

function createPlaylist (req, res) {
  models.playlists.create(
    req.user.id,
    req.body.name,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}

function deletePlaylist (req, res) {
  models.playlists.delete(
    req.user.id,
    req.params.name,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}

function getPlaylistTracks (req, res) {
  
  function findByUserId (userId) {
    models.playlists.findByName(
      userId,
      req.params.name,
      function (err, playlist) {
        if (err) {
          res.send(400, { error: err });
          return;
        }
        res.send(playlist);
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

function addTrackToPlaylist (req, res) {
  models.playlists.addSong(
    req.user.id,
    req.params.name,
    req.body,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}

function removeTrackFromPlaylist (req, res) {
  models.playlists.removeSong(
    req.user.id,
    req.params.name,
    req.params.id,
    function (err, numberAffected) {
      if (err) {
        res.send(400, { error: err });
        return;
      }
      res.send({ success: true, count: numberAffected });
    });
}


module.exports = function (app) {
  app.get('/api/users/:user/playlists',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          getPlaylists);

  app.post('/api/users/me/playlists',
           securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
           createPlaylist);

  app.delete('/api/users/me/playlists/:name',
             securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
             deletePlaylist);

  app.get('/api/users/:user/playlists/:name/tracks',
          securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
          getPlaylistTracks);

  app.post('/api/users/me/playlists/:name/tracks',
           securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
           addTrackToPlaylist);

  app.delete('/api/users/me/playlists/:name/tracks/:id',
             securityMiddleware.ensureAuthenticated, securityMiddleware.ensureInvited,
             removeTrackFromPlaylist);
};
