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
        let conn = DBConn.getConnection();
        conn.connect(function(err){
            if(err) reject(err);

            let sql = "SELECT AVG(rating) AS rating FROM rating WHERE playlistID = ?;";
            conn.query(sql, [playlistID], function(err, result){
                if(err) reject(err);
                console.log("Data layer: " + result[0].rating);
    
                conn.end();
                resolve(result);
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
        let rating = null;
        let sql = "SELECT rating " + 
                    "FROM rating " + 
                    "WHERE playlistID = " + playlistID + " " +
                    "AND personID = " + personID + ";";
        let conn = new sql.Request();
        conn.query(sql, function(err, result){
            if (err) throw err;
            rating = result["rating"];
        });

        return rating;
    },

    /**
     * Insert a new rating for a specific person and playlist
     * @param {String} personID ID of person who submitted playlist
     * @param {String} playlistID ID of playlist rating is for 
     * @param {int} rating Rating value to insert
     */
    addRating(personID, playlistID, rating){
        let query = "INSERT INTO rating (personID, playlistID, rating) " + 
                    "VALUES ("+ personID + "," + playlistID + "," + rating + ");";
        let conn = new sql.Request();
        conn.query(sql, function(err, result){
            if (err) throw err;
            console.log("1 rating inserted");
        });

        return 1;
    },

    /**
     * Deletes an existing rating by ID
     * @param {int} ratingID ID of rating to remove
     */
    deleteRating(ratingID){
        let query = "DELETE FROM rating " + 
                        "WHERE ratingID = " + ratingID + ";";
        let conn = new sql.Request();
        conn.query(sql, function(err, result){
            if (err) throw err;
            console.log("Number of ratings deleted: " + result.affectedRows);
            return result.affectedRows;
        });
    }
}