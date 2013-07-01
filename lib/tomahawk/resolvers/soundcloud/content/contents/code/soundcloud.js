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

var Tomahawk         = require('../../../../../runtime'),
    TomahawkResolver = require('../../../../../resolver');

function capitalize (str) {
    return str.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1+p2.toUpperCase();
    });
}

var SoundcloudResolver = Tomahawk.extend(new TomahawkResolver(), {
	settings: {
		name: 'SoundCloud',
		icon: 'soundcloud-icon.png',
		weight: 100,
		timeout: 15,
        soundcloudClientId: 'acfd2e0f5cd5d115d60c81c05fe7eee5',
        echonestApiKey: 'K6KTZDCFZHPG6CHG4'
	},
    
	getConfigUi: function () {
		var uiData = Tomahawk.readBase64("config.ui");
		return {
			"widget": uiData,
			fields: [{
				name: "includeCovers",
				widget: "covers",
				property: "checked"
			}, {
				name: "includeRemixes",
				widget: "remixes",
				property: "checked"
			}, {
				name: "includeLive",
				widget: "live",
				property: "checked"
			}],
			images: [{
				"soundcloud.png" : Tomahawk.readBase64("soundcloud.png")
			}]
		};
	},

	newConfigSaved: function () {
		var userConfig = this.getUserConfig();
		if ((userConfig.includeCovers !== this.includeCovers) || (userConfig.includeRemixes !== this.includeRemixes) || (userConfig.includeLive !== this.includeLive)) {
			this.includeCovers = userConfig.includeCovers;
			this.includeRemixes = userConfig.includeRemixes;
			this.includeLive = userConfig.includeLive;
			this.saveUserConfig();
		}
	},
	
	init: function() {
		// Set userConfig here
		var userConfig = this.getUserConfig();
		if ( userConfig !== undefined ){
			this.includeCovers = userConfig.includeCovers;
			this.includeRemixes = userConfig.includeRemixes;
			this.includeLive = userConfig.includeLive;
		}
		else {
			this.includeCovers = false;
			this.includeRemixes = false;
			this.includeLive = false;
		}
	},

	getTrack: function (trackTitle, origTitle) {
		if ((this.includeCovers === false || this.includeCovers === undefined) && trackTitle.search(/cover/i) !== -1 && origTitle.search(/cover/i) === -1){
			return null;
		}
		if ((this.includeRemixes === false || this.includeRemixes === undefined) && trackTitle.search(/(re)*mix/i) !== -1 && origTitle.search(/(re)*mix/i) === -1){
			return null;
		}
		if ((this.includeLive === false || this.includeLive === undefined) && trackTitle.search(/live/i) !== -1 && origTitle.search(/live/i) === -1){
			return null;
		}
		else {
			return trackTitle;
		}
	},

	resolve: function (qid, artist, album, title)
	{
        var query, i;
        
		if (artist !== "") {
			query = encodeURIComponent(artist) + "+";
		}
		if (title !== "") {
			query += encodeURIComponent(title);
		}
		var apiQuery = "http://api.soundcloud.com/tracks.json?consumer_key=" + this.settings.soundcloudClientId + "&filter=streamable&q=" + query;
		var that = this;
		var empty = {
			results: [],
			qid: qid
		};
		Tomahawk.asyncRequest(apiQuery, function (resp) {
			if (resp.length !== 0){
				var results = [];
				for (i = 0; i < resp.length; i++) {
					// Need some more validation here
					// This doesnt help it seems, or it just throws the error anyhow, and skips?
					if (resp[i] === undefined){
						continue;
					}

					if (!resp[i].streamable){ // Check for streamable tracks only
						continue;
					}

					// Check whether the artist and title (if set) are in the returned title, discard otherwise
					// But also, the artist could be the username
					if (resp[i].title !== undefined && (resp[i].title.toLowerCase().indexOf(artist.toLowerCase()) === -1 || resp[i].title.toLowerCase().indexOf(title.toLowerCase()) === -1)) {
						continue;
					}
					var result = {};
					result.artist = artist;
					if (that.getTrack(resp[i].title, title)){
						result.track = title;
					}
					else {
						continue;
					}

					result.source = that.settings.name;
					result.mimetype = "audio/mpeg";
					result.bitrate = 128;
					result.duration = resp[i].duration / 1000;
					result.score = 0.85;
					result.year = resp[i].release_year;
					result.url = resp[i].stream_url + ".json?client_id=" + that.settings.soundcloudClientId;
					if (resp[i].permalink_url !== undefined) {
                        result.linkUrl = resp[i].permalink_url;
                    }
					results.push(result);
				}
				var return1 = {
					qid: qid,
                    weight: SoundcloudResolver.settings.weight,
					results: [results[0]]
				};
				Tomahawk.addTrackResults(return1);
			}
			else {
				Tomahawk.addTrackResults(empty);
			}
		});
	},
	
	search: function (qid, searchString)
	{
		var apiQuery = "http://api.soundcloud.com/tracks.json?consumer_key=" + this.settings.soundcloudClientId + "&filter=streamable&q=" + encodeURIComponent(searchString.replace('"', '').replace("'", ""));
		var that = this;
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
                var artist = encodeURIComponent(capitalize(result.artist));
                var url = "http://developer.echonest.com/api/v4/artist/extract?api_key=" + that.settings.echonestApiKey + "&format=json&results=1&sort=hotttnesss-desc&text=" + artist;
                
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
                            weight: SoundcloudResolver.settings.weight,
                            qid: qid
                        };
                        Tomahawk.addTrackResults(toReturn);
                    }
                });
            }
            
			if (resp.length !== 0) {
				for (i = 0; i < resp.length; i++) {
					if(resp[i] === undefined){
						stop = stop - 1;
						continue;
					}
					var result = {};

					if (that.getTrack(resp[i].title, "")){
						var track = resp[i].title;
						if (track.indexOf(" - ") !== -1 && track.slice(track.indexOf(" - ") + 3).trim() !== ""){
							result.track = track.slice(track.indexOf(" - ") + 3).trim();
							result.artist = track.slice(0, track.indexOf(" - ")).trim();
						}
						else if (track.indexOf(" -") !== -1 && track.slice(track.indexOf(" -") + 2).trim() !== ""){
							result.track = track.slice(track.indexOf(" -") + 2).trim();
							result.artist = track.slice(0, track.indexOf(" -")).trim();
						}
						else if (track.indexOf(": ") !== -1 && track.slice(track.indexOf(": ") + 2).trim() !== ""){
							result.track = track.slice(track.indexOf(": ") + 2).trim();
							result.artist = track.slice(0, track.indexOf(": ")).trim();
						}
						else if (track.indexOf("-") !== -1 && track.slice(track.indexOf("-") + 1).trim() !== ""){
							result.track = track.slice(track.indexOf("-") + 1).trim();
							result.artist = track.slice(0, track.indexOf("-")).trim();
						}
						else if (track.indexOf(":") !== -1 && track.slice(track.indexOf(":") + 1).trim() !== ""){
							result.track = track.slice(track.indexOf(":") + 1).trim();
							result.artist = track.slice(0, track.indexOf(":")).trim();
						}
						else if (track.indexOf("\u2014") !== -1 && track.slice(track.indexOf("\u2014") + 2).trim() !== ""){
							result.track = track.slice(track.indexOf("\u2014") + 2).trim();
							result.artist = track.slice(0, track.indexOf("\u2014")).trim();
						}
						else if (resp[i].title !== "" && resp[i].user.username !== ""){
							// Last resort, the artist is the username
							result.track = resp[i].title;
							result.artist = resp[i].user.username;
						}
						else {
							stop = stop - 1;
							continue;
						}
					}
					else {
						stop = stop - 1;
						continue;
					}

					result.source = that.settings.name;
					result.mimetype = "audio/mpeg";
					result.bitrate = 128;
					result.duration = resp[i].duration / 1000;
					result.score = 0.85;
					result.year = resp[i].release_year;
					result.url = resp[i].stream_url + ".json?client_id=" + that.settings.soundcloudClientId;
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
});

module.exports = SoundcloudResolver;