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

var Tomahawk = require('../../runtime'),
    metadata = require('./metadata');

module.exports = {
  settings: {
    weight: 100,
    timeout: 5,
    exfmClientId: 'soundrocket'
  },

  cleanTitle: function (title, artist) {
    // If the title contains a newline character, strip them off and remove additional spacing
    var newTitle = "",
        stringArray = title.split("\n");
    title.split("\n").forEach(function (split) {
      newTitle += split.trim() + " ";
    });
    // Remove dash and quotation characters.
    newTitle = newTitle.replace("\u2013", "").replace("  ", " ").replace("\u201c", "").replace("\u201d", "");
    // If the artist is included in the song title, cut it
    if (newTitle.toLowerCase().indexOf(artist.toLowerCase() + " -") === 0) {
      newTitle = newTitle.slice(artist.length + 2).trim();
    } else if (newTitle.toLowerCase().indexOf(artist.toLowerCase() + "-") === 0) {
      newTitle = newTitle.slice(artist.length + 1).trim();
    } else if (newTitle.toLowerCase().indexOf(artist.toLowerCase()) === 0) {
      // FIXME: This might break results where the artist name is a substring of the song title.
      newTitle = newTitle.slice(artist.length).trim();
    }
    return newTitle;
  },

  search: function (qid, searchString) {
    var _this = this,
        // Build search query for ex.fm
        url = "http://ex.fm/api/v3/song/search/" +
              encodeURIComponent(searchString) +
              "?start=0&results=20&client_id=" +
              this.settings.exfmClientId;

    // send request and parse it into javascript
    Tomahawk.asyncRequest(url, function (response) {
      var results = [];

      // check the response
      if (response.results > 0) {
        response.songs.forEach(function (song) {
          var result = {},
              dTitle = _this.cleanTitle(song.title, song.artist),
              dArtist = song.artist,
              dAlbum = "";

          if ((song.url.indexOf("http://api.soundcloud") === 0) ||
              (song.url.indexOf("https://api.soundcloud") === 0)) {
            // unauthorised, use soundcloud resolver instead
            return;
          }

          if (song.artist === null || song.title === null) {
            // This track misses relevant information, so we are going to ignore it.
            return;
          }

          if (song.album !== null) {
            dAlbum = song.album;
          }

          if (dTitle.toLowerCase().indexOf(searchString.toLowerCase() !== -1)) {
            result.artist = dArtist;
            result.album = dAlbum;
            result.track = ((dTitle !== "") ? dTitle : searchString);
            result.source = metadata.name;
            result.url = song.url;
            result.artworkUrl = song.image.small;
            results.push(result);
          }
        });
      }

      Tomahawk.addTrackResults({
        qid: qid,
        weight: _this.settings.weight,
        results: results
      });
    });
  }
};
