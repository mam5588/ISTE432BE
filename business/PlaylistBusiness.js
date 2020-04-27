const playlistData = require('../data/PlaylistData.js');
const personBusiness = require('./PersonBusiness.js');

const Playlist = require('../util/Playlist.js');
const Track = require('../util/Track.js');

const spotify = require('./SpotifyProxy.js');

const ErrorMessage = [500,{"error":"Sorry, could not process your request right now."}];


/**
 * Get all playlists in the system
 * @param {String} accessToken Access token for validating with external API
*/
let getAllPlaylists = function(searchParam, accessToken){
    return new Promise(function(resolve, reject){
        try{
            let returnList = []
            playlistData.searchPlaylistsByName(searchParam)
            .then(function(playlists){
                if(playlists.length == 0){
                    resolve([200, returnList]);
                    return;
                }
                for(let i = 0; i < playlists.length; i++){
                    populatePlaylist(playlists[i].playlistID, accessToken)
                    .then(function(populatedPlaylist){
                        returnList.push(populatedPlaylist);
                        if(returnList.length == playlists.length){
                            resolve([200, returnList]);
                            return;
                        }
                    })
                    .catch(function(err){
                        reject(err);
                        return;
                    });
                }
            })
            .catch(function(err){
                resolve(ErrorMessage);
                return;
            })
        }
        catch(err){
            resolve(ErrorMessage);
            return;
        }
  });
}

/**
 * Get all playlists on spotify for a user
 * @param {String} personID ID of person to get playlists for
 * @param {String} accessToken Access token for validating with external API
*/
let getMyPlaylists = function(accessToken){
    return new Promise(function(resolve, reject){
        try{
            spotify.get(`https://api.spotify.com/v1/me/playlists`, accessToken)
            .then(function(responseJson){
                if(responseJson.items.length == 0){
                    resolve([200, []]);
                    return;
                }
                parseSpotifyJson(responseJson, accessToken)
                .then(function(playlists){
                    playlistData.getPlaylistByPerson(playlists[0].personID)
                    .then(function(userPlaylists){
                        playlists.forEach(function(playlist){
                            playlist.shared = false;
                            userPlaylists.forEach(function(userPlaylist){
                                if(playlist.playlistID == userPlaylist.playlistID){
                                    playlist.shared = true;
                                }
                            })
                        })
                        resolve([200, playlists]);
                        return;
                    });
                })

            })
            .catch(function(err){
                resolve(ErrorMessage);
                return;
            })
        }
        catch(err){
            resolve(ErrorMessage);
            return;
        }
  });
}

/**
 * Get all playlists on spotify for a user
 * @param {String} personID ID of person to get playlists for
 * @param {String} accessToken Access token for validating with external API
*/
let getPlaylist = function(playlistID, accessToken){
    return new Promise(function(resolve, reject){
        try{
            if(playlistID === "" || playlistID == null){
                resolve([400, {"error":"playlistID must be a non-empty string."}]);
                return;
            }
            playlistData.getPlaylist(playlistID)
            .then(function(playlist){
                if(playlist == null){
                    resolve([404, "This playlist does not exist in our system."]);
                    return;
                }
                
                spotify.get(`https://api.spotify.com/v1/playlists/${playlistID}`, accessToken)
                .then(function(responseJson){
                        populatePlaylist(responseJson.id, accessToken)
                        .then(function(populatedPlaylist){
                            resolve([200, populatedPlaylist]);
                        })
                        .catch(function(err){
                            reject(err);
                            return;
                        });
                })
                .catch(function(err){
                    reject(err);
                    return;
                });
            })
            .catch(function(err){
                resolve(ErrorMessage);
                return;
            })
        }
        catch(err){
            resolve(ErrorMessage);
            return;
        }
  });
}

/**
 * Add a new playlist from spotify for a user
 * @param {String} playlistID ID of playlist to add
 * @param {String} personID ID of person to add playlist to
 * @param {String} accessToken Access token for validating with external API
*/
let addPlaylist = function(playlistID, accessToken){
    return new Promise(function(resolve, reject){
        if(playlistID === "" || playlistID == null){
            resolve([400, {"error":"playlistID must be a non-empty string."}]);
            return;
        }

        playlistData.getPlaylist(playlistID)
        .then(function(playlist){
            if(playlist != null){
                resolve([409, {"error":"This playlist is already in our system."}]);
                return;
            }

            personBusiness.getPersonByID(playlist.personID).then(function(result){
                if(result[0] != 200){
                    resolve([result[0],result[1]]);
                    return;
                }
    
                getPlaylist(playlistID, accessToken)
                .then(function(response){
                    playlist = response[1];
                    playlistData.addPlaylist(playlist.playlistID, personID, playlist.name)
                    .then(function(response){
                        resolve([200, playlist]);
                        return;
                    });
                })
                .catch(function(err){
                    reject(err);
                });
            })
            .catch(function(err){
                resolve(ErrorMessage);
                return;
            });
        })
        .catch(function(err){
            resolve(ErrorMessage);
            return;
        });
    });
}

/**
 * Add a new playlist from spotify for a user
 * @param {String} playlistID ID of playlist to add
 * @param {String} accessToken Access token for validating with external API
*/
let deletePlaylist = function(playlistID, accessToken){
    return new Promise(function(resolve, reject){
        if(playlistID === "" || playlistID == null){
            resolve([400, {"error":"playlistID must be a non-empty string."}]);
            return;
        }

        playlistData.getPlaylist(playlistID)
        .then(function(playlist){
            if(playlist == null){
                resolve([404, {"error":"No playlist with that ID exists in the system."}]);
                return;
            }

            playlistData.deletePlaylist(playlistID)
            .then(function(affectedRows){
                resolve([200, {"success" : `Successfully deleted ${affectedRows} playlists`}]);
            })
            .catch(function(err){
                resolve(ErrorMessage);
                return;
            });
        })
        .catch(function(err){
            resolve(ErrorMessage);
            return;
        });
    });
}

let parseSpotifyJson = async function(responseJson, accessToken){
    return new Promise(function(resolve, reject){
        playlists = [];
        responseJson.items.forEach(function(playlistJson){
            populatePlaylist(playlistJson.id, accessToken)
            .then(function(populatedPlaylist){
                playlists.push(populatedPlaylist);
                if(playlists.length == responseJson.items.length){
                    resolve(playlists);
                }
            })
            .catch(function(err){
                reject(err);
                return;
            });
        });
    });
}

let populatePlaylist = function(playlistID, accessToken){
    return new Promise(function(resolve, reject){
        spotify.get(`https://api.spotify.com/v1/playlists/${playlistID}`, accessToken)
        .then(function(responseJson){

            //Parse information into a Playlist object
            let playlist = new Playlist();
            playlist.playlistID = responseJson.id;
            playlist.personID = responseJson.owner.id;
            playlist.name = responseJson.name;
            playlist.description = responseJson.description;
            playlist.spotifyURL = responseJson.external_urls.spotify;
            playlist.imageURL = responseJson.images[0].url;

            //Append owner information
            personBusiness.getPersonByID(responseJson.owner.id)
            .then(function(personResponse){
                playlist.person = personResponse[0];

                //Get tracks which belong to this playlist
                extractTracks(responseJson, accessToken)
                .then(function(tracks){
                    playlist.tracks = tracks;
                    resolve(playlist);
                    return;
                });
            });
        })
        .catch(function(err){
            reject(err);
            return;
        });
    });
}

let extractTracks = function(playlistJson, accessToken){
    return new Promise(function(resolve, reject){
        let trackList = [];

        Array.from(playlistJson.tracks.items).forEach(item => {
            let track = item.track;
            let trackID = track.id;
            let name = track.name;
            let album = track.album.name;
            let artist = track.artists[0].name;
            let spotifyURL = track.external_urls.spotify;
            let imageURL = track.album.images[0].url;
            trackList.push(new Track(trackID, name, album, artist, spotifyURL, imageURL));
        });

        resolve(trackList);
        return;
    });
}

module.exports = {
    getAllPlaylists,
    getMyPlaylists,
    getPlaylist,
    addPlaylist,
    deletePlaylist
};