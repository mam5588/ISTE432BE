const sql = require("mysql");
const DbConn = require('./DbConn.js')

module.exports = {

    /**
     * Get all comments by playlist ID
     * Null if no result
     * @param {String} playlistID  ID of playlist to search by
     */
    getComment(personID, playlistID){
        let comment = null;
        let sql = "SELECT comment " + 
                    "FROM comment " + 
                    "WHERE playlistID = " + playlistID + " " +
                        "AND personID = " + personID + ";";
 
        var conn = DbConn.getConnection();
        conn.query(sql, function(err, result){
            if (err) throw err;
            comment = result["rating"]
        });

        return comment;
    },

    /**
     * Get all comments for a playlist
     * Null if no result
     * @param {String} playlistID ID of playlist to sort by
     */
    getComments(playlistID){
        let sql = "SELECT comment " +
                    "FROM comment " + 
                    "WHERE playlistID = " + playlistID + ";";
        let conn = new sql.Request();
        conn.query(sql, function(err, result){
            if (err) throw err;
            let comments = result["average"];
        });

        return comments;
    },

    /**
     * Insert a comment into the database
     * @param {String} personID  ID of person submitting comment
     * @param {String} playlistID ID of playlist comment is submitted on 
     * @param {String} comment Comment value
     */
    addComment(personID, playlistID, comment){
        let query = "INSERT INTO comment (personID, playlistID, comment) " + 
                        "VALUES (" + personID + "," + playlistID + "," + comment + ");";
        let conn = new sql.Request();
        conn.query(sql, function(err, result){
            if (err) throw err;
            console.log("Number of comments inserted: " + result.affectedRows);
        });
    },

    /**
     * Deletes an existing comment by ID
     * @param {int} commentID ID of comment to remove
     */
    deleteComment(commentID){
        let query = "DELETE FROM comment " + 
                        "WHERE commentID = " + commentID + ";";
        let conn = new sql.Request();
        conn.query(sql, function(err, result){
            if (err) throw err;
            console.log("Number of comments deleted: " + result.affectedRows);
            return result.affectedRows;
        });
    }
}