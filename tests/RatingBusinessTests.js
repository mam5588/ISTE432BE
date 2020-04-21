const ratingBusiness = require('../business/ratingBusiness.js');
const ratingData = require('../data/ratingData.js');



function testGetAverageRating(){
  var playlistID = "adminPlaylist1ID";
  var result = ratingData.getAverageRating(playlistID);
  //var expResult =
  if(result = expResult){
    console.log("Test pass");
  }
  else{
    console.log("Test fail");
  }
}

function testGetAllRatings(){
 var playlistID = "adminPlaylist1ID";
 var result = ratingData.getAllRatings(playlistID);
 var expResult = [
     {
         "rating": 5,
         "personID": "reviewer1ID",
         "playlistID": "adminPlaylist1ID",
         "createdDate": "2020-04-20T19:22:26.000Z",
         "lastUpdatedDate": "2020-04-20T19:22:26.000Z"
     },
     {
         "rating": 1,
         "personID": "reviewer2ID",
         "playlistID": "adminPlaylist1ID",
         "createdDate": "2020-04-03T18:46:16.000Z",
         "lastUpdatedDate": "2020-04-03T18:46:16.000Z"
     }
    ]
   if(result == expResult){
     console.log("Test pass");
   }
   else{
     console.log("Test fail");
   }
}

function testGetRating(){
  var personID ="reviewer1ID";
  var playlistID = "adminPlaylist1ID";
  var result = ratingData.getRating(personID, playlistID);
  var expResult = {
    "rating": 5,
    "personID": "reviewer1ID",
    "playlistID": "adminPlaylist1ID",
    "createdDate": "2020-04-20T19:22:26.000Z",
    "lastUpdatedDate": "2020-04-20T19:22:26.000Z"
    }
  if(result = expResult){
    console.log("Test Pass");
  }
  else{
    console.log("Test Fail");
  }
}

function insertRating(){
  var personID = "reviewer3ID";
  var playlistID = "adminPlaylist1ID";
  var rating = 3;
  var createdDate = "2020-04-20 02:03:45";
  var lastUpdatedDate = "2020-04-20 02:03:45";

  var result = ratingData.addRating(personID, playlistID, rating, createdDate, lastUpdatedDate);
  var expResult = "{success: Successfully inserted 1 ratings}";

  if(result = expResult){
    console.log("Test Pass");
  }
  else{
    console.log("Test Fail");
  }
}

function deleteRating(){
  var personID = "reviewer3ID";
  var result = ratingData.deleteRating(personID);
  var expResult = "{success: Successfully deleted 1 rating}";
  if(result = expResult){
    console.log("Test Pass");
  }
  else{
    console.log("Test Fail");
  }
}
