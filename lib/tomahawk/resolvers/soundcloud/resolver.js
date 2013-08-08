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

var Tomahawk = require('../../runtime'),
    metadata = require('./metadata');

module.exports = {
  settings: {
    weight: 100,
    timeout: 15,
    soundcloudClientId: 'acfd2e0f5cd5d115d60c81c05fe7eee5',
    echonestApiKey: 'K6KTZDCFZHPG6CHG4'
  },

  getTrack: function (trackTitle, origTitle) {
    if ((this.includeCovers === false || this.includeCovers === undefined) &&
        trackTitle.search(/cover/i) !== -1 && origTitle.search(/cover/i) === -1) {
      return null;
    }

    if ((this.includeRemixes === false || this.includeRemixes === undefined) &&
        trackTitle.search(/(re)*mix/i) !== -1 && origTitle.search(/(re)*mix/i) === -1) {
      return null;
    }

    if ((this.includeLive === false || this.includeLive === undefined) &&
        trackTitle.search(/live/i) !== -1 && origTitle.search(/live/i) === -1) {
      return null;
    } else {
      return trackTitle;
    }
  },

  search: function (qid, searchString) {
    var _this = this;
    var apiQuery = "http://api.soundcloud.com/tracks.json?consumer_key=" +
                   _this.settings.soundcloudClientId +
                   "&filter=streamable&q=" +
                   encodeURIComponent(searchString.replace('"', '').replace("'", ""));
    var empty = {
      results: [],
      qid: qid
    };

    function sortResults (a, b) {
      return a.id - b.id;
    }

    Tomahawk.asyncRequest(apiQuery, function (resp) {
      var stop = resp.length,
          results = [],
          i;

      function sanitize (i, result) {
        var artist = encodeURIComponent(Tomahawk.capitalize(result.artist));
        var url = "http://developer.echonest.com/api/v4/artist/extract?api_key=" +
                  _this.settings.echonestApiKey +
                  "&format=json&results=1&sort=hotttnesss-desc&text=" +
                  artist;

        Tomahawk.asyncRequest(url, function (response) {
          if (response && response.artists && response.artists.length > 0) {
            artist = response.artists[0].name;
            result.artist = artist;
            result.id = i;
            results.push(result);
            stop = stop - 1;
          } else {
            results.push(result);
            stop = stop - 1;
          }

          if (stop === 0) {
            results = results.sort(sortResults);

            for (var j = 0; j < results.length; j++){
              delete results[j].id;
            }

            var toReturn = {
              results: results,
              weight: _this.settings.weight,
              qid: qid
            };

            Tomahawk.addTrackResults(toReturn);
          }
        });
      }

      if (resp.length !== 0) {
        for (i = 0; i < resp.length; i++) {
          if (resp[i] === undefined){
            stop = stop - 1;
            continue;
          }

          var result = {};

          if (_this.getTrack(resp[i].title, "")) {
            var track = resp[i].title;
            if (track.indexOf(" - ") !== -1 && track.slice(track.indexOf(" - ") + 3).trim() !== "") {
              result.track = track.slice(track.indexOf(" - ") + 3).trim();
              result.artist = track.slice(0, track.indexOf(" - ")).trim();
            } else if (track.indexOf(" -") !== -1 && track.slice(track.indexOf(" -") + 2).trim() !== "") {
              result.track = track.slice(track.indexOf(" -") + 2).trim();
              result.artist = track.slice(0, track.indexOf(" -")).trim();
            } else if (track.indexOf(": ") !== -1 && track.slice(track.indexOf(": ") + 2).trim() !== "") {
              result.track = track.slice(track.indexOf(": ") + 2).trim();
              result.artist = track.slice(0, track.indexOf(": ")).trim();
            } else if (track.indexOf("-") !== -1 && track.slice(track.indexOf("-") + 1).trim() !== "") {
              result.track = track.slice(track.indexOf("-") + 1).trim();
              result.artist = track.slice(0, track.indexOf("-")).trim();
            } else if (track.indexOf(":") !== -1 && track.slice(track.indexOf(":") + 1).trim() !== "") {
              result.track = track.slice(track.indexOf(":") + 1).trim();
              result.artist = track.slice(0, track.indexOf(":")).trim();
            } else if (track.indexOf("\u2014") !== -1 && track.slice(track.indexOf("\u2014") + 2).trim() !== "") {
              result.track = track.slice(track.indexOf("\u2014") + 2).trim();
              result.artist = track.slice(0, track.indexOf("\u2014")).trim();
            } else if (resp[i].title !== "" && resp[i].user.username !== "") {
              // Last resort, the artist is the username
              result.track = resp[i].title;
              result.artist = resp[i].user.username;
            } else {
              stop = stop - 1;
              continue;
            }
          } else {
            stop = stop - 1;
            continue;
          }

          result.source = metadata.name;
          result.duration = resp[i].duration / 1000;
          result.year = resp[i].release_year;
          result.url = resp[i].stream_url + ".json?client_id=" + _this.settings.soundcloudClientId;
          result.artworkUrl = resp[i].artwork_url;

          if (resp[i].permalink_url !== undefined) {
            result.linkUrl = resp[i].permalink_url;
          }

          sanitize(i, result);
        }

        if (stop === 0) {
          Tomahawk.addTrackResults(empty);
        }
      }
      else {
        Tomahawk.addTrackResults(empty);
      }
    });
  }
};
