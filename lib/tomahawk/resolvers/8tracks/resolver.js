/* === This file is part of Tomahawk Player - <http://tomahawk-player.org> ===
 *
 *   Copyright 2011, Janez Troha (https://github.com/dz0ny)
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
    weight: 90,
    timeout: 5,
    api: "bb11051e74a11178b0ab436722a05df58b76340c",
    token: null
  },

  init: function () {
    var _this = this;
    Tomahawk.asyncRequest(
      "http://8tracks.com/sets/new.json?api_version=2&api_key="+ this.settings.api,
      function (response) {
        Tomahawk.log('8tracks token: ' + response.play_token);
        _this.settings.token = response.play_token;
      });
  },

  search: function (qid, searchString) {
    var _this = this;
    var api = this.settings.api;
    var token = this.settings.token;
    var url = "http://8tracks.com/mixes.json?api_version=2&api_key=" +
              api +
              "&per_page=15&sort=popular&q=" +
              searchString;

    if (!this.settings.token) {
      // either wait for init fetch to work, or give up
      Tomahawk.log('8tracks token is not ready.');
      return;
    }

    Tomahawk.asyncRequest(url, function (response) {
      var mixes = response.mixes;
      var expectedTracksCount = mixes.length;
      var result = {
        qid: qid,
        results: [],
        weight: _this.settings.weight
      };

      mixes.forEach(function (mix) {
        Tomahawk.asyncRequest(
          "http://8tracks.com/sets/" +
          token +
          "/play.json?api_version=2&api_key=" +
          api +
          "&mix_id=" + mix.id,
          function (response) {
            var track;

            if (!response.set) {
              expectedTracksCount--;
            } else {
              track = response.set.track;

              if ((track.url.indexOf("http://api.soundcloud") === 0) ||
                  (track.url.indexOf("https://api.soundcloud") === 0)) {
                // unauthorised, use soundcloud resolver instead
                expectedTracksCount--;
              } else {
                result.results.push({
                  artist: track.performer,
                  track: track.name,
                  album: track.release_name,
                  url: track.url,
                  duration: track.play_duration,
                  source: metadata.name,
                  artworkUrl: mix.cover_urls.sq56,
                  linkUrl: mix.restful_url
                });
              }
            }

            if (result.results.length === expectedTracksCount) {
              Tomahawk.addTrackResults(result);
            }
          });
      });
    });
  }
};
