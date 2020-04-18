const DbConn = require('./DBConn.js');
const Rating = require('../util/Rating.js');

module.exports = {

    /**
     * Find average of ratings by playlist ID
     * Null if no result
     * @param {String} playlistID ID of playlist to sort by
     */
    getAverageRating(playlistID){
        let conn = DbConn.getConnection();
        conn.connect();
        let results = conn.query("SELECT rating FROM rating WHERE personID = 'reviewer1ID' AND playlistID = 'adminPlaylist1ID';");
                
        console.log("results: ",results);  //Here I got result
        return results;

        /*
        let dbConn = new DbConn();

        let sql = "SELECT AVG(rating) AS rating FROM rating WHERE playlistID = ?;";
        dbConn.query(sql, [playlistID])
            .then(result => {
                console.log("Data layer: " + result[0].rating);
                return result[0].rating
            })
            .catch(err => {
                throw err;
            })
            .finally(function(){
                dbConn.close();
            });
            */
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