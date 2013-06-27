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

var Tomahawk         = require('../../../../../runtime'),
    TomahawkResolver = require('../../../../../resolver');

var JamendoResolver = Tomahawk.extend(TomahawkResolver, {
    settings: {
        name: 'Jamendo',
        icon: 'jamendo-icon.png',
        weight: 75,
        timeout: 5
    },
    handleResponse: function(qid, resp) {
        var results = [];
        // check the response
        if (resp && resp.length > 0) {
            // walk through the results and store it in 'results'
            for (var i = 0; i < resp.length; i++) {
                var link = resp[i];

                var result = {};
                result.artist = link.artist_name;
                result.album = link.album_name;
                result.track = link.name;
                //result.year = Tomahawk.valueForSubNode(link, "year");
                result.source = this.settings.name;
                result.url = decodeURI(link.stream);
                // jamendo also provide ogg ?
                result.extension = "mp3";
                //result.bitrate = Tomahawk.valueForSubNode(link, "bitrate")/1000;
                result.duration = link.duration;
                result.score = 1.0;
                result.artworkUrl = link.album_image;

                results.push(result);
            }
        }
        var return1 = {
            qid: qid,
            results: results
        };
        Tomahawk.addTrackResults(return1);
    },
    
    sendRequest: function (url) {
        // send request and parse it into javascript
        Tomahawk.asyncRequest(url, this.handleResponse);
    },
    resolve: function (qid, artist, album, title) {
        // build query to Jamendo
        var url = "http://api.jamendo.com/get2/id+name+duration+stream+album_name+artist_name+album_image/track/json/track_album+album_artist/?";
        if (title !== "") {
            url += "name=" + encodeURIComponent(title) + "&";
        }

        if (artist !== "") {
            url += "artist_name=" + encodeURIComponent(artist) + "&";
        }

        if (album !== "") {
            url += "album_name=" + encodeURIComponent(album) + "&";
        }

        url += "n=20";

        var that = this;
        Tomahawk.asyncRequest(url, function(resp) { that.handleResponse(qid, resp); } );
    },
    search: function (qid, searchString) {
        // build query to Jamendo
        var url = "http://api.jamendo.com/get2/id+name+duration+stream+album_name+artist_name+album_image/track/json/track_album+album_artist/?";
        if (searchString !== "") {
            url += "searchquery=" + encodeURIComponent(searchString);
        }

        url += "&n=20";
        var that = this;
        Tomahawk.asyncRequest(url, function(resp) { that.handleResponse(qid, resp); } );
    },
});

module.exports = JamendoResolver;
