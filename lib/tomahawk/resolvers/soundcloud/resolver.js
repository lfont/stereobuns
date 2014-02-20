/* === This file is part of Tomahawk Player - <http://tomahawk-player.org> ===
 *
 *   Copyright 2012, Thierry Göckel <thierry@strayrayday.lu>
 *
 *   Tomahawk is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   Tomahawk is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with Tomahawk. If not, see <http://www.gnu.org/licenses/>.
 */

var util     = require('util'),
    Resolver = require('../resolver'),
    Stream   = require('../stream');

var API_KEY = 'acfd2e0f5cd5d115d60c81c05fe7eee5';

function SoundCloudResolver () {
  Resolver.call(this, 'soundcloud');
}

util.inherits(SoundCloudResolver, Resolver);
  
SoundCloudResolver.prototype.extractInfo = function (track) {
  var info = null;
  
  if (track.title.indexOf(" - ") !== -1 &&
      track.title.slice(track.title.indexOf(" - ") + 3).trim() !== "") {
    info = {
      name: track.title.slice(track.title.indexOf(" - ") + 3),
      artist: track.title.slice(0, track.title.indexOf(" - "))
    };
  } else if (track.title.indexOf(" -") !== -1 &&
             track.title.slice(track.title.indexOf(" -") + 2).trim() !== "") {
    info = {
      name: track.title.slice(track.title.indexOf(" -") + 2),
      artist: track.title.slice(0, track.title.indexOf(" -"))
    };
  } else if (track.title.indexOf(": ") !== -1 &&
             track.title.slice(track.title.indexOf(": ") + 2).trim() !== "") {
    info = {
      name: track.title.slice(track.title.indexOf(": ") + 2),
      artist: track.title.slice(0, track.title.indexOf(": "))
    };
  } else if (track.title.indexOf("-") !== -1 &&
             track.title.slice(track.title.indexOf("-") + 1).trim() !== "") {
    info = {
      name: track.title.slice(track.title.indexOf("-") + 1),
      artist: track.title.slice(0, track.title.indexOf("-"))
    };
  } else if (track.title.indexOf(":") !== -1 &&
             track.title.slice(track.title.indexOf(":") + 1).trim() !== "") {
    info = {
      name: track.title.slice(track.title.indexOf(":") + 1),
      artist: track.title.slice(0, track.title.indexOf(":"))
    };
  } else if (track.title.indexOf("\u2014") !== -1 &&
             track.title.slice(track.title.indexOf("\u2014") + 2).trim() !== "") {
    info = {
      name: track.title.slice(track.title.indexOf("\u2014") + 2),
      artist: track.title.slice(0, track.title.indexOf("\u2014"))
    };
  } else if (track.title !== "" && track.user.username !== "") {
    // Last resort, the artist is the username
    info = {
      name: track.title,
      artist: track.user.username
    };
  }
  
  return info;
};

SoundCloudResolver.prototype.getTracks = function (query) {
  var _this        = this,
      url          = 'http://api.soundcloud.com/tracks.json?' +
                     'consumer_key=' + API_KEY +
                     '&filter=streamable' +
                     '&q=' + query,
      tracksStream = new Stream();

  this.asyncRequest(url, function (res) {
    tracksStream.forEach(res, function (track) {
      var info  = _this.extractInfo(track);
      
      if (info) {
        return {
          trackId: _this.info.name + track.id,
          artist: info.artist.trim(),
          name: info.name.trim(),
          source: _this.info.name,
          url: track.stream_url + '.json?client_id=' + API_KEY,
          artworkUrl: track.artwork_url,
          linkUrl: track.permalink_url
        };
      }
    });
  });

  return tracksStream;
};

module.exports = new SoundCloudResolver();
