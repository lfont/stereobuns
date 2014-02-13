/* === This file is part of Tomahawk Player - <http://tomahawk-player.org> ===
 *
 * Copyright 2011, lasonic <lasconic@gmail.com>
 * Copyright 2013, Uwe L. Korn <uwelk@xhochy.com>
 *
 * Tomahawk is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Tomahawk is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Tomahawk. If not, see <http://www.gnu.org/licenses/>.
 */

var util     = require('util'),
    Resolver = require('../resolver');

function ExFmResolver () {
  Resolver.call(this, 'exfm', {
    timeout: 5,
    apiKey: 'soundrocket'
  });
}

util.inherits(ExFmResolver, Resolver);

ExFmResolver.prototype.cleanTitle = function (title, artist) {
  // If the title contains a newline character, strip them off and remove additional spacing
  var newTitle = "",
      stringArray = title.split("\n");

  title.split("\n").forEach(function (split) {
    newTitle += split.trim() + " ";
  });

  // Remove dash and quotation characters.
  newTitle = newTitle.replace("\u2013", "")
                     .replace("  ", " ")
                     .replace("\u201c", "")
                     .replace("\u201d", "");

  if (artist) {
    // If the artist is included in the song title, cut it
    if (newTitle.toLowerCase().indexOf(artist.toLowerCase() + " -") === 0) {
      newTitle = newTitle.slice(artist.length + 2).trim();
    } else if (newTitle.toLowerCase().indexOf(artist.toLowerCase() + "-") === 0) {
      newTitle = newTitle.slice(artist.length + 1).trim();
    } else if (newTitle.toLowerCase().indexOf(artist.toLowerCase()) === 0) {
      // FIXME: This might break results where the artist name is a substring of the song title.
      newTitle = newTitle.slice(artist.length).trim();
    }
  }

  return newTitle;
};

ExFmResolver.prototype.getTracks = function (query, tracksStream) {
  var _this = this,
      url   = 'http://ex.fm/api/v3/song/search/' + query + '?' +
              'client_id=' + this.settings.apiKey;

  this.asyncRequest(url, function (res) {
    if (res && res.results) {
      res.songs.forEach(function (song) {
        var title;

        if (song.artist !== null && song.title !== null) {
          if ((song.url.indexOf('http://api.soundcloud') < 0) &&
              (song.url.indexOf('https://api.soundcloud') < 0)) {

            title = _this.cleanTitle(song.title, song.artist);

            if (title.toLowerCase().indexOf(query.toLowerCase() >= 0)) {
              tracksStream.emit('track', {
                trackId: _this.info.name + song.id,
                artist: song.artist.trim(),
                name: title.trim(),
                source: _this.info.name,
                url: song.url,
                artworkUrl: song.image.small,
                linkUrl: 'http://ex.fm/song/' + song.id
              });
            }
          }
        }
      });
    }

    tracksStream.emit('end');
  });
};

module.exports = new ExFmResolver();
