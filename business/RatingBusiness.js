const ratingData = require('../data/RatingData.js');
const personBusiness = require('./PersonBusiness.js');

const ErrorMessage = [500, {"error":"Sorry, could not process your request right now."}];

/**
 * Get all ratings for a playlist
 * @param {String} playlistID ID of playlist to search by
 */
let getAllRatings = function(playlistID){

  return new Promise(function(resolve, reject){
    //Parameter validation
    //TODO check that playlist exists when sybsystem is implemented

    ratingData.getAllRatings(playlistID)
    .then(function(results){
      resolve([200, results]);
    })
    .catch(function(err){
      resolve(ErrorMessage);
    })
  });
}

  /**
   * Get average rating for a playlist
   * @param {String} playlistID ID of playlist to search by
   */
let getAverageRating = function(playlistID){

  return new Promise(function(resolve, reject){
    //Parameter validation
    //TODO check that playlist exists when sybsystem is implemented

    ratingData.getAverageRating(playlistID)
    .then(function(average){

      if(average == null){
        resolve([404, {"error": "No ratings exist for this playlist."}]);
        return;
      }

      resolve([200, average]);
    })
    .catch(function(err){
      resolve(ErrorMessage);
    })
  });
}

/**
 * Get a rating by playlist ID and person ID
 * @param {String} playlistID ID of playlist to search by
 * @param {String} personID ID of person to search by
 */
let getRating = function(personID, playlistID){
  return new Promise(function(resolve, reject){
    //Parameter validation
    //TODO check that playlist exist when subsystems are active
    personBusiness.getPersonByID(personID)
    .then(function(result){
      if(result[0] != 200){
        resolve([result[0], result[1]]);
        return;
      }
      ratingData.getRating(personID, playlistID)
      .then(function(rating){
  
        //Data validation
        if(rating == null){
          resolve([404, {"error": "This person does not have a rating for this playlist."}]);
          return;
        }
  
        resolve([200, rating]);
      })
      .catch(function(err){
        resolve(ErrorMessage)
      });
    });
  });
}

/**
 * Insert a new rating by person ID and playlist ID
 * @param {String} personID ID of person who submitted rating
 * @param {String} playlistID ID of playlist being rated
 * @param {int} rating submitted rating
 */
let addRating = function(personID, playlistID, rating){
  return new Promise(function(resolve, reject){
    //Parameter validation
    let errorString = null;

    if( rating == undefined || isNaN(rating) ){
      errorString = "Rating must be an integer.";
    }
    else if ( rating < 1 || rating > 5){
      errorString = "Rating must be between 1 and 5.";
    }

    if( errorString != null){
      resolve([400, {"error": errorString}]);
    }
    //TODO check that playlist exists when sybsystem is implemented

    personBusiness.getPersonByID(personID)
    .then(function(result){
      if(result[0] != 200){
        resolve([result[0], result[1]]);
        return;
      }
      //Further business logic
      getRating(personID, playlistID)
      .then(function(result){
        if(result[0] != 404){
          resolve([409, {"error": "This user has already submitted a rating for this playlist"}]);
          return;
        }
      
        ratingData.addRating(personID, playlistID, rating)
        .then(function(affectedRows){
          if(affectedRows == 0){
            resolve(ErrorMessage);
            return;
          }
          resolve([200, {"success": `inserted ${affectedRows} rating`}]);
          return;
        })
        .catch(function(err){
          resolve(ErrorMessage);
          return;
        });
      });
    });
  });
}

/**
 * Delete an existing rating by rating ID
 * @param {int} ratingID ID of rating to delete
 */
let deleteRating = function(personID, playlistID){
  return new Promise(function(resolve, reject){

    personBusiness.getPersonByID(personID)
    .then(function(result){
      if(result[0] != 200){
        resolve([result[0], result[1]]);
        return;
      }
    //TODO check that playlist exists when sybsystem is implemented

      //Further business logic
      getRating(personID, playlistID)
      .then(function(result){
        if(result[0] != 200){
          resolve([result[0], result[1]]);
          return;
        }
      
        ratingData.deleteRating(personID, playlistID)
        .then(function(affectedRows){
          if(affectedRows == 0){
            resolve(ErrorMessage);
            return;
          }
          resolve([200, {"success": `deleted ${affectedRows} rating`}]);
          return;
        })
        .catch(function(err){
          resolve(ErrorMessage);
          return;
        });
      });
    });
  });
}

module.exports = {
  getAllRatings,
  getAverageRating,
  getRating,
  addRating,
  deleteRating
};
