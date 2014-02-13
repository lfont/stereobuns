/* === This file is part of Tomahawk Player - <http://tomahawk-player.org> ===
 *
 *   Copyright 2011, lasconic <lasconic@gmail.com>
 *   Copyright 2011, Leo Franchi <lfranchi@kde.org>
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
    Resolver = require('../resolver');

function OfficialFmResolver () {
  Resolver.call(this, 'official.fm', {
    timeout: 5,
    apiKey: ''
  });

  this.settings.apiKey = this.spell(' ');
}

util.inherits(OfficialFmResolver, Resolver);

OfficialFmResolver.prototype.spell = function (a) {
  var magic = function (b) {
    return (b = (b) ? b : this).split("").map(function (d) {
      if (!d.match(/[A-Za-z]/)) {
        return d;
      }
      var c = d.charCodeAt(0) >= 96;
      var k = (d.toLowerCase().charCodeAt(0) - 96 + 12) % 26 + 1;
      return String.fromCharCode(k + (c ? 96 : 64));
    }).join("");
  };
  return magic(a);
};


OfficialFmResolver.prototype.getTracks = function (query, tracksStream) {
  var _this = this,
      url   = 'http://api.official.fm/tracks/search?' +
              'api_key=' + this.settings.apiKey +
              '&api_version=2.0' +
              '&fields=streaming,cover' +
              '&q=' + query;

  this.asyncRequest(url, function (res) {
    if (res.total_entries !== 0) {
      res.tracks.forEach(function (data) {
        var track = data.track;

        if (track.streaming === undefined || track.streaming.http === undefined) {
          _this.log("Found result from Official.fm but no streaming url...");
        } else {
          tracksStream.emit('track', {
            trackId: _this.info.name + track.page.substring(track.page.lastIndexOf('/') + 1),
            artist: track.artist.trim(),
            name: track.title.trim(),
            source: _this.info.name,
            url: track.streaming.http,
            artworkUrl: track.cover.urls.small,
            linkUrl: track.page
          });
        }
      });
    }

    tracksStream.emit('end');
  });
};

module.exports = new OfficialFmResolver();
