const ratingData = require('../data/RatingData.js');
const ErrorResponse = [500, "Sorry, we could not service your request at this time."];

/**
 * Get average rating for a playlist
 * @param {String} playlistID ID of playlist to search by
 */
var getAverageRating = function(playlistID){

  return new Promise(function(resolve, reject){
    //Parameter validation      
    //TODO check that playlist exists when sybsystem is implemented

    ratingData.getAverageRating(playlistID)
    .then(function(rating){

      if(rating == null){
        resolve( [404, "No ratings exist for this playlist."]);
      }
  
      resolve([200, rating]);
    })
    .catch(function(err){
      return ErrorResponse;
    })
  });
}

/**
 * Get a rating by playlist ID and person ID
 * @param {String} playlistID ID of playlist to search by
 * @param {String} personID ID of person to search by
 */
var getRating = function(personID, playlistID){

  return new Promise(function(resolve, reject){
    //Parameter validation      
    //TODO check that playlist exists when sybsystem is implemented

    ratingData.getRating(personID, playlistID)
    .then(function(rating){

      if(rating == null){
        resolve([404, "This user has no rating for this playlist."]);
      }
  
      resolve([200, rating]);
    })
    .catch(function(err){
      return ErrorResponse;
    })
  });
}

/**
 * Insert a new rating by person ID and playlist ID
 * @param {String} personID ID of person who submitted rating
 * @param {String} playlistID ID of playlist being rated
 * @param {int} rating submitted rating
 */
var addRating = function(personID, playlistID, rating){
  return new Promise(function(resolve, reject){
    //Parameter validation
    let errorString = null;

    if( isNaN(rating) ){
      errorString = "Rating must be an integer.";
    }
    else if ( rating < 1 || rating > 5){
      errorString = "Rating must be between 1 and 5.";
    }
    if( errorString != null){
      resolve([400, errorString]);
    }

    //Further business logic
    getRating(personID, playlistID)
    .then(function(rating){
      if(rating[0] == 200){
        resolve([409, "This user has already submitted a rating for this playlist"]);
      }
      //TODO check that playlist exists when sybsystem is implemented
      //TODO check that person exists when sybsystem is implemented


      let today = new Date();
      ratingData.addRating(personID, playlistID, rating, today, today)
      .then(function(affectedRows){
        if(affectedRows == 0){
          return ErrorResponse;
        }
        resolve([200, `{success: Successfully inserted ${affectedRows} ratings}`]);
      })
      .catch(function(err){
        return ErrorResponse;
      });
    });
  })
  .catch(function(err){
    return ErrorResponse;
  });
}

/**
 * Delete an existing rating by rating ID
 * @param {int} ratingID ID of rating to delete
 */
var deleteRating = function(personID, playlistID){
  return new Promise(function(resolve, reject){

    //Further business logic
    getRating(personID, playlistID)
    .then(function(response){
      if(response[0] == 404){
        resolve(response);
      }
      //TODO check that playlist exists when sybsystem is implemented
      //TODO check that person exists when sybsystem is implemented

      ratingData.deleteRating(personID, playlistID)
      .then(function(affectedRows){
        if(affectedRows == 0){
          return ErrorResponse;
        }

        resolve([200, `{success: Successfully deleted ${affectedRows} ratings}`]);
      })
    })
    .catch(function(err){
      return ErrorResponse;
    });
  })
  .catch(function(err){
    return ErrorResponse;
  });
}

  module.exports = {
    getAverageRating,
    getRating,
    addRating,
    deleteRating
  };