const commentData = require('../data/CommentData.js');

module.exports = {


  /**
   * Get all comments for a playlist
   * @param {String} playlistID ID of playlist to search by
   */
  getComments(playlistID){
    try{
      //Parameter validation
      //TODO check that playlist exists when sybsystem is implemented

      //Retrieve comment data
      let comments = commentData.getComments(playlistID);

      //Data validation
      if(comment == null){
        return [404, "This person does not have a comment on this playlist."]
      }

      return [200, comments];
    }
    catch(err){
      return [500, "Sorry, we could not service your request at this time."]
    }
  },

  /**
   * Get specific comment by person for a playlist
   * @param {String} personID ID of person to search by
   * @param {String} playlistID ID of playlist to search by
   */
  getComment(personID, playlistID){
    try{
      //Parameter validation
      //TODO check that playlist exists when sybsystem is implemented
      //TODO check that person exists when sybsystem is implemented

      //Retrieve comment data
      let comment = commentData.getComment(personID, playlistID);

      return [200, comment];
    }
    catch(err){
      return [500, "Sorry, we could not service your request at this time."]
    }
  },

  /**
   * Add a new comment by a person on a playlist
   * @param {String} personID ID of person submitting comment
   * @param {String} playlistID ID of playlist person is commenting on
   * @param {String} comment person's comment (max 140 characters)
   */
  addComment(personID, playlistID, comment){
    try{
      //Parameter validation
      let errorString = null;
      if( !comment.length() > 140){
        errorString = "Comment length must be less than 140 characters.";
      }
      if( errorString!= null){
        return [400, errorString];
      }
      //TODO check that playlist exists when sybsystem is implemented
      //TODO check that person exists when sybsystem is implemented

      //Insert comment data
      let comment = commentData.getComment(personID, playlistID);

      return [200, comment];
    }
    catch(err){
      return [500, "Sorry, we could not service your request at this time."]
    }
  },

  /**
   * Delete an existing comment by commentID
   * @param {int} commentID ID of comment to delete
   */
  deleteComment(commentID){
    try{
      //Parameter validation
      let errorString = null;
      if(!commentID.isInteger()){
        return [400, "Comment ID must be a valid integer."];
      }

      //Delete record
      let numDeletedRecords = commentData.deleteComment(commentID);

      //Data validation
      if(numDeletedRecords < 1){
        return [404, "This person does not have a comment on this playlist"]
      }

      return [200, "Successfully deleted " + numDeletedRecords + " comment"];
    }
    catch(err){
      return [500, "Sorry, we could not service your request at this time."]
    }
  }
}
