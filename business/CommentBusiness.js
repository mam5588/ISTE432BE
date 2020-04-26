const commentData = require('../data/CommentData.js');
const personBusiness = require('./PersonBusiness.js');

const ErrorResponse = [500, "Sorry, we could not service your request at this time."];

/**
 * Get all comments for a playlist
 * @param {String} playlistID ID of playlist to search by
 */
var getPlaylistComments = function(playlistID){

  return new Promise(function(resolve, reject){
    //Parameter validation      
    //TODO check that playlist exists when sybsystem is implemented

    commentData.getPlaylistComments(playlistID)
    .then(function(commentList){
  
      resolve([200, commentList]);
      return;
    })
    .catch(function(err){
      return ErrorResponse;
    })
  });
}

/**
 * Get all comments from a user by playlist ID and person ID
 * @param {String} playlistID ID of playlist to search by
 * @param {String} personID ID of person to search by
 */
var getUserComments = function(personID, playlistID){

  return new Promise(function(resolve, reject){
    //Parameter validation      
    //TODO check that playlist exists when sybsystem is implemented

    personBusiness.getPersonByID(personID)
    .then(function(result){
      if(result[0] != 200){
        resolve([result[0], result[1]]);
        return;
      }
      commentData.getUserComments(personID, playlistID)
      .then(function(commentList){
    
        resolve([200, commentList]);
        return;
      })
      .catch(function(err){
        return ErrorResponse;
      })
    });
  });
}

/**
 * Get all comments from a user by playlist ID and person ID
 * @param {String} commentID ID of comment to search for
 */
var getComment = function(commentID){

  return new Promise(function(resolve, reject){
    //Parameter validation      
    //TODO check that playlist exists when sybsystem is implemented

    commentData.getComment(commentID)
    .then(function(comment){
      if(comment == null){
        resolve([404, `no comment with commentID ${commentID} exists`])
        return;
      }
  
      resolve([200, comment]);
      return;
    })
    .catch(function(err){
      resolve(ErrorResponse);
      return;
    })
  });
}

/**
 * Insert a new comment by person ID and playlist ID
 * @param {String} personID ID of person who submitted commented on
 * @param {String} playlistID ID of playlist being commented on
 * @param {int} comment submitted comment
 */
var addComment = function(personID, playlistID, comment){
  return new Promise(function(resolve, reject){
    //Parameter validation
    let errorString = null;

    if(comment == null){
      errorString = "Comments cannot be null.";
    }
    else if ( comment.length < 1 || comment.length > 140){
      errorString = "Comments be between 0 and 140 characters.";
    }
    
    if( errorString != null){
      resolve([400, {"error": errorString}]);
      return;
    }
    
    //TODO check that playlist exists when sybsystem is implemented

    personBusiness.getPersonByID(personID)
    .then(function(result){
      if(result[0] != 200){
        resolve([result[0], result[1]]);
        return;
      }
      let today = new Date();
      commentData.addComment(personID, playlistID, comment, today, today)
      .then(function(affectedRows){
        if(affectedRows == 0){
          resolve(ErrorResponse);
          return;
        }
        resolve([200, {"success": `Successfully inserted ${affectedRows} comments`}]);
        return;
      })
      .catch(function(err){
        resolve(ErrorResponse);
        return;
      });
    });
  });
}

/**
 * Delete a comment by person ID and playlist ID
 * @param {String} commentID ID of comment being deleted from
 */
var deleteComment = function(commentID){
  return new Promise(function(resolve, reject){

    //Further business logic
    getComment(commentID)
    .then(function(response){
      if(response[0] != 200){
        resolve([result[0], result[1]]);
        return;
      }
      //TODO check that playlist exists when sybsystem is implemented
      //TODO check that person exists when sybsystem is implemented

      commentData.deleteComment(commentID)
      .then(function(affectedRows){
        if(affectedRows == 0){
          resolve(ErrorResponse);
          return;
        }

        resolve([200, {"success": "Successfully deleted ${affectedRows} comment"}]);
        return;
      })
    })
    .catch(function(err){
      resolve(ErrorResponse);
      return;
    });
  })
  .catch(function(err){
    resolve(ErrorResponse);
    return;
  });
}

  module.exports = {
    getPlaylistComments,
    getUserComments,
    getComment,
    addComment,
    deleteComment
  };