const DBConn = require('./DBConn.js');
const Playlist = require('../util/Playlist.js');

module.exports = {

    /**
     * Get all playlists for a person   
     * @param {String} personID ID of person to search for playlists from
     */
    getPlaylistsByPerson(personID){
        return new Promise(function(resolve, reject){

            let playlistList = [];
            let query = "SELECT * FROM playlist WHERE personID = ?;";
            DBConn.query(query, [personID])
            .then(function(result){
                result.forEach(function(row){
                    playlistList.push(new Playlist(row.playlistID, row.personID, row.playlistName));
                });
                resolve(playlistList);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get a playlist by personID
     * Null if no result
     * @param {String} personID ID of person to search for playlists from
     */
    getPlaylistByPerson(personID){
        return new Promise(function(resolve, reject){

            let playlists = [];
            let query = "SELECT * FROM playlist WHERE personID = ?;";
            DBConn.query(query, [personID])
            .then(function(result){
                result.forEach(function(row){
                    playlists.push(new Playlist(row.playlistID, row.personID, row.playlistName));
                });
                resolve(playlists);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get a playlists where name is similar to search query
     * Null if no result
     * @param {String} searchParam keyword to search playlist names by
     */
    searchPlaylistsByName(searchParam){
        return new Promise(function(resolve, reject){

            let playlistList = [];
            let query = `SELECT * FROM playlist WHERE playlistName LIKE '%${searchParam}%';`;
            DBConn.query(query)
            .then(function(result){
                result.forEach(function(row){
                    playlistList.push(new Playlist(row.playlistID, row.personID, row.playlistName));
                });
                resolve(playlistList);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get a playlists by playlistID
     * Null if no result
     * @param {String} playlistID ID of playlist to search by
     */
    getPlaylist(playlistID){
        return new Promise(function(resolve, reject){

            let playlist = null;
            let query = "SELECT * FROM playlist WHERE playlistID = ?;";
            DBConn.query(query, [playlistID])
            .then(function(result){
                if(result.length != 0){
                    row = result[0];
                    playlist = new Playlist(row.playlistID, row.personID, row.playlistName);
                }
                resolve(playlist);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Insert a new person
     * @param {String} personID ID of person
     * @param {String} personName name of person
     * @param {String} createdDate the date on which the person was created
     * @param {String} lastUpdatedDate the date on which the person was last updated
     */
    addPlaylist(playlistID, personID, playlistName){
        return new Promise(function(resolve, reject){
            let query = "INSERT INTO playlist (playlistID, personID, playlistName) VALUES (?, ?, ?);";

            DBConn.query(query, [playlistID, personID, playlistName])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Delete a playlist by playlist ID
     * @param {String} playlistID ID of playlist to delete
     */
    deletePlaylist(playlistID){
        return new Promise(function(resolve, reject){
            let query = "DELETE FROM playlist WHERE playlistID = ?;";

            DBConn.query(query, [playlistID])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    }
}
