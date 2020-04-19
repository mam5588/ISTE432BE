const DBConn = require('./DBConn.js');
const Rating = require('../util/Rating.js');

module.exports = {

    /**
     * Find average of ratings by playlist ID
     * Null if no result
     * @param {String} playlistID ID of playlist to sort by
     */
    getAverageRating(playlistID){
        return new Promise(function(resolve, reject){

            let rating = null;
            let query = "SELECT AVG(rating) AS rating, playlistID, createdDate, lastUpdatedDate FROM rating WHERE playlistID = ?;";
            DBConn.query(query, [playlistID])
            .then(function(result){
                if(result[0].rating != null){
                    result = result[0];
                    rating = new Rating(result.rating, null, result.playlistID, result.createdDate, result.lastUpdatedDate);
                }
                resolve(rating);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get a rating by playlist ID and person ID
     * Null if no result
     * @param {String} personID ID of person to search playlist
     * @param {String} playlistID  ID of playlist to search by
     */
    getRating(personID, playlistID){
        return new Promise(function(resolve, reject){

            let rating = null;
            let query = "SELECT * FROM rating WHERE playlistID = ? AND personID = ?;";
            DBConn.query(query, [playlistID, personID])
            .then(function(result){
                if(result.length != 0){
                    result = result[0];
                    rating = new Rating(result.rating, result.personID, result.playlistID, result.createdDate, result.lastUpdatedDate);
                }
                resolve(rating);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Insert a new rating for a specific person and playlist
     * @param {String} personID ID of person who submitted playlist
     * @param {String} playlistID ID of playlist rating is for 
     * @param {int} rating Rating value to insert
     */
    addRating(personID, playlistID, rating, createdDate, lastUpdatedDate){
        return new Promise(function(resolve, reject){
            let query = "INSERT INTO rating (personID, playlistID, rating, createdDate, lastUpdatedDate) VALUES (?, ?, ?, ?, ?);";
            
            DBConn.query(query, [personID, playlistID, rating, createdDate, lastUpdatedDate])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Deletes an existing rating by ID
     * @param {int} ratingID ID of rating to remove
     */
    deleteRating(personID, playlistID){
        return new Promise(function(resolve, reject){
            let query = "DELETE FROM rating WHERE personID = ? AND playlistID = ?;";
                
            DBConn.query(query, [personID, playlistID])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    }
}