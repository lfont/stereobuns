/* === This file is part of Tomahawk Player - <http://tomahawk-player.org> ===
 *
 *   Copyright 2011, lasconic <lasconic@gmail.com>
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
    weight: 80,
    timeout: 5
  },

  handleResponse: function (qid, resp) {
    var _this   = this,
        results = [];

    // check the response
    if (resp && resp.length > 0) {
      // walk through the results and store it in 'results'
      for (var i = 0; i < resp.length; i++) {
        var link   = resp[i],
            result = {};

        result.artist = link.artist_name;
        result.album = link.album_name;
        result.track = link.name;
        result.source = metadata.name;
        result.url = decodeURI(link.stream);
        result.duration = link.duration;
        result.artworkUrl = link.album_image;

        results.push(result);
      }
    }

    var return1 = {
      qid: qid,
      weight: _this.settings.weight,
      results: results
    };

    Tomahawk.addTrackResults(return1);
  },

  search: function (qid, searchString) {
    var _this = this;

    // build query to Jamendo
    var url = "http://api.jamendo.com/get2/id+name+duration+stream+album_name+artist_name+album_image/track/json/track_album+album_artist/?" +
              'searchquery=' + searchString +
              '&n=20';

    Tomahawk.asyncRequest(url, function (resp) {
      _this.handleResponse(qid, resp);
    });
  }
};
