const ratingData = require('../data/RatingData.js');

module.exports = {

  /**
   * Get average rating for a playlist
   * @param {String} playlistID ID of playlist to search by
   */
  getAverageRating(playlistID){
    try{
      //Parameter validation      
      //TODO check that playlist exists when sybsystem is implemented

      let average = ratingData.getAverageRating(playlistID);
      console.log("Business layer value: " + average);

      if(average == null){
        return [404, "No ratings exist for this playlist."];
      }

      return[200, average];
    }
    catch(err){
      return [500, err.message];
      //return [500, "Sorry, we could not service your request at this time."]
    }
  },

  /**
   * Get a rating by playlist ID and person ID
   * @param {String} playlistID ID of playlist to search by
   * @param {String} personID ID of person to search by
   */
  getRating(personID, playlistID){
    try{
      //Parameter validation
      //TODO check that person and playlist exist when subsystems are active

      let rating = ratingData.getRating(personID, playlistID);
        
      //Data validation
      if(rating == null){
        return [404, "This person does not have a rating for this playlist."]
      }

      return [200, rating];
    }
    catch(err){
      return [500, "Sorry, we could not service your request at this time."]
    }
  },

  /**
   * Insert a new rating by person ID and playlist ID
   * @param {String} personID ID of person who submitted rating
   * @param {String} playlistID ID of playlist being rated
   * @param {int} rating submitted rating
   */
  addRating(personID, playlistID, rating){
    try{
      //Parameter validation
      let errorString = null;

      if( !rating.isInteger() ){
        errorString = "Rating must be an integer.";
      }
      else if ( rating < 1 || rating > 5){
        errorString = "Rating must be between 1 and 5.";
      }
      else if (!playlist.isInteger()) {
        errorString = "Playlist ID must be an integer.";
      }
      if( errorString != null){
        return [400, errorString];
      }

      //Further business logic
      if(this.getRating(personID, playlistID) != null){
        return [409, "This use has already submitted a rating for this playlist"];
      }
      //TODO check that playlist exists when sybsystem is implemented
      //TODO check that person exists when sybsystem is implemented

      ratingData.addRating(personID, playlistID, rating);

      return [200, ratingNum];
    }
    catch(err){
      return [500, "Sorry, we could not service your request at this time."]
    }
  },

  /**
   * Delete an existing rating by rating ID
   * @param {int} ratingID ID of rating to delete
   */
  deleteRating(ratingID){
    try{
      //Parameter validation
      let errorString = null;

      if( !rating.isInteger() ){
        errorString = "Rating must be an integer.";
      }
      this.getRating(ratingID);
      //TODO check that playlist exists when sybsystem is implemented
      //TODO check that person exists when sybsystem is implemented

      //Delete record
      let numDeletedRecords = ratingData.deleteRating(ratingID);
      
      //Data validation
      if(numDeletedRecords < 1){
        return [404, "This person does not have a rating for this playlist."]
      }

      return [200, "Successfully deleted " + numDeletedRecords + " records"];
    }
    catch(err){
      return [500, "Sorry, we could not service your request at this time."]
    }
  }
}
