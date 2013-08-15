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

var Tomahawk = require('../../runtime'),
    metadata = require('./metadata');

module.exports = {
  settings: {
    timeout: 5,
    apiKey: ''
  },

  spell: function (a) {
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
  },

  init: function () {
    this.settings.apiKey = this.spell(" ");
  },

  search: function (qid, searchString) {
    var _this = this;

    var apiQuery = 'http://api.official.fm/tracks/search?' +
                   'api_key=' + _this.settings.apiKey +
                   '&api_version=2.0' +
                   '&fields=streaming,cover' +
                   '&q=' + searchString;

    var resultObj = {
      results: [],
      qid: qid
    };

    Tomahawk.asyncRequest(apiQuery, function (resp) {
      if (resp.total_entries !== 0) {
        for (var i = 0; i < resp.total_entries; i++) {
          if (resp.tracks[i] === undefined || resp.tracks[i].track === undefined) {
            continue;
          }

          var track = resp.tracks[i].track;

          if (track.streaming === undefined || track.streaming.http === undefined) {
            Tomahawk.log("Found result from Official.fm but no streaming url...");
            continue;
          }

          var result = {
            track: track.title,
            artist: track.artist,
            source: metadata.name,
            duration: track.duration,
            url: track.streaming.http,
            artworkUrl: track.cover.urls.small
          };

          resultObj.results.push(result);
        }
      }

      Tomahawk.addTrackResults(resultObj);
    });
  }
};
