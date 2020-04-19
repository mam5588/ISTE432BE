const DBConn = require('./DBConn.js');
const Comment = require('../util/Comment.js');

module.exports = {

    /**
     * Find all comments by playlist ID
     * @param {String} playlistID ID of playlist to search by
     */
    getPlaylistComments(playlistID){
        return new Promise(function(resolve, reject){

            let commentList = [];
            let query = "SELECT * FROM comment WHERE playlistID = ?;";
            DBConn.query(query, [playlistID])
            .then(function(result){
                if(result.length != 0){
                    result.forEach(function(row){
                        commentList.push(new Comment(row.commentID, row.comment, row.personID, row.playlistID, row.createdDate, row.lastUpdatedDate));
                    });
                }
                resolve(commentList);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get all comments by playlist ID and person ID
     * @param {String} personID ID of person to search by
     * @param {String} playlistID  ID of playlist to search by
     */
    getUserComments(personID, playlistID){
        return new Promise(function(resolve, reject){

            let commentList = [];
            let query = "SELECT * FROM comment WHERE personID = ? AND playlistID = ?;";
            DBConn.query(query, [personID, playlistID])
            .then(function(result){
                if(result.length != 0){
                    result.forEach(function(row){
                        commentList.push(new Comment(row.commentID, row.comment, row.personID, row.playlistID, row.createdDate, row.lastUpdatedDate));
                    });
                }
                resolve(commentList);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get a comment by comment ID
     * Null if no result
     * @param {String} personID ID of person to search by
     * @param {String} playlistID  ID of playlist to search by
     */
    getComment(commentID){
        return new Promise(function(resolve, reject){

            let comment = null;
            let query = "SELECT * FROM comment WHERE commentID = ?;";
            DBConn.query(query, [commentID])
            .then(function(result){
                if(result.length != 0){
                    row = result[0];
                    comment = new Comment(row.commentID, row.comment, row.personID, row.playlistID, row.createdDate, row.lastUpdatedDate);
                }
                resolve(comment);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Insert a new comment for a specific person and playlist
     * @param {String} personID ID of person who submitted playlist
     * @param {String} playlistID ID of playlist comment is for 
     * @param {int} comment Comment value to insert
     */
    addComment(personID, playlistID, comment, createdDate, lastUpdatedDate){
        return new Promise(function(resolve, reject){
            let query = "INSERT INTO comment (comment, personID, playlistID, createdDate, lastUpdatedDate) VALUES (?, ?, ?, ?, ?);";
            
            DBConn.query(query, [comment, personID, playlistID, createdDate, lastUpdatedDate])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Delete a comment by commentID
     * @param {String} commentID ID of comment to delete
     */
    deleteComment(commentID){
        return new Promise(function(resolve, reject){
            let query = "DELETE FROM comment WHERE commentID = ?;";
                
            DBConn.query(query, [commentID])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    }
}